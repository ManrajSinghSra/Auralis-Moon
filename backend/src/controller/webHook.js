const { streamApiKey, streamSecret, OPENAI_API_KEY } = require("../Secret");
const { StreamClient } = require("@stream-io/node-sdk");
const { Agent } = require("../model/Agent");
const { Meeting } = require("../model/Meeting");
const { inngest } = require("../inngest/Inngest");

const serverClient = new StreamClient(streamApiKey, streamSecret);
const activeSessions = {};

const webhook = async (req, res) => {
  try {
    const signature = req.headers["x-signature"];
    if (!signature) return res.status(400).json({ error: "Missing signature" });

    const rawBody = req.body.toString("utf8");
    serverClient.verifyWebhook(rawBody, signature);
    const payload = JSON.parse(rawBody);

    res.status(200).json({ status: "ok" });

    const meetingId = payload.call?.custom?.meetingId;
    const agentId = payload.call?.custom?.agentId;
    const user = payload.call?.custom?.user;

    if (payload.type === "call.session_started") {
      setImmediate(
        async () => {
          try {

            if (activeSessions[meetingId]) {
              console.log("Duplicate session_started, skipping:", meetingId);
              return;
            }

            await Meeting.findOneAndUpdate(
              { _id: meetingId },
              { status: "active" },
              { new: true, runValidators: true }
            );
            if (!agentId) return console.error("Missing agentId");

            const agent = await Agent.findById(agentId);
            if (!agent) return console.error("Agent not found");

            await serverClient.upsertUsers([
              { id: agentId, name: agent.name, role: "user" },
            ]);

            const call = serverClient.video.call("default", meetingId);

            try {
              await call.startTranscription();
            } catch (err) {
              if (err?.code === 4) console.log("Transcription already running");
              else throw err;
            }

            try {
              await call.startRecording();
            } catch (err) {
              if (err?.code === 4) console.log("Recording already running");
              else throw err;
            }
            const realtimeClient = await serverClient.video.connectOpenAi({
              call,
              openAiApiKey: OPENAI_API_KEY,
              agentUserId: agentId,
            });

            activeSessions[meetingId] = { realtimeClient, agentId };

            await realtimeClient.updateSession({
              instructions: agent.instruction,
              voice: "alloy",
              turn_detection: { type: "server_vad" },
              input_audio_transcription: { model: "whisper-1" },
            });

            await realtimeClient.sendUserMessageContent([
              {
                type: "input_text",
                text: `Please greet the user, their name is ${user.name}, and introduce yourself. Your name is ${agent.name}. Please do not change the topic if the user asks questions irrelevant to the instruction.`,
              },
            ]);

            realtimeClient.on("error", (err) =>
              console.error("RealtimeClient error:", err)
            );
            console.log("AI agent connected and speaking");
          } catch (err) {
            console.error("Async AI error:", err);
          }
        });
    }

    if (payload.type === "call.session_participant_left") {
      await Meeting.findOneAndUpdate(
        { _id: meetingId },
        { status: "processing" },
        { new: true }
      );
      const session = activeSessions[meetingId];
      if (!session) return;

      const whoLeft = payload.participant?.user_id;
      if (whoLeft !== session.agentId) {
        await disconnectAgent(meetingId);
      }
    }

    if (payload.type === "call.session_ended") {
      await disconnectAgent(meetingId);
      await Meeting.findOneAndUpdate(
        { _id: meetingId },
        { status: "processing" },
        { new: true }
      );
    }

    if (payload.type === "call.transcription_ready") {
      const id = payload.call_cid.split(":")[1];
      await Meeting.findByIdAndUpdate(id, {
        transcriptUrl: payload.call_transcription.url,
      });
      await triggerInngestIfReady(id);
    }

    if (payload.type === "call.recording_ready") {
      const id = payload.call_cid.split(":")[1];
      await Meeting.findByIdAndUpdate(id, {
        recordingUrl: payload.call_recording.url,
      });
      await triggerInngestIfReady(id);
    }

  }
  catch (error) {
    console.error("Webhook error:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Webhook failed" });
    }
  }
};

async function triggerInngestIfReady(meetingId) {
  const meeting = await Meeting.findById(meetingId);
  if (!meeting) return console.error("Meeting not found:", meetingId);

  if (!meeting.transcriptUrl || !meeting.recordingUrl) return;

  const updated = await Meeting.findOneAndUpdate(
    { _id: meetingId, status: { $ne: "completed" } },
    { status: "completed" },
    { new: true }
  );

  if (!updated) return;

  await inngest.send({
    name: "meetings/processing",
    data: {
      meetingId: meeting._id,
      transcriptUrl: meeting.transcriptUrl,
      recordingUrl: meeting.recordingUrl,
    },
  });

  console.log("Inngest triggered for meeting:", meetingId);
}

async function disconnectAgent(meetingId) {
  const session = activeSessions[meetingId];
  if (!session) return;

  try {
    const call = serverClient.video.call("default", meetingId);

    try {
      await call.stopRecording();
      await call.stopTranscription();
    } catch (err) {
      console.log("Stop recording/transcription error (safe to ignore):", err?.message);
    }
    await call.end();
    delete activeSessions[meetingId];
    console.log(`Agent disconnected for meeting: ${meetingId}`);
  } catch (err) {
    console.error("Error closing agent session:", err);
  }
}

module.exports = { webhook };
