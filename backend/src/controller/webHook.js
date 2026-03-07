const { streamApiKey, streamSecret, OPENAI_API_KEY } = require("../../Secret");
const { StreamClient } = require("@stream-io/node-sdk");
const { Agent } = require("../model/Agent");

const serverClient = new StreamClient(streamApiKey, streamSecret);
const activeSessions = {};

const webhook = async (req, res) => {
  try {
    const signature = req.headers["x-signature"];

    if (!signature) return res.status(400).json({ error: "Missing signature" });

    const rawBody = req.body.toString("utf8");

    serverClient.verifyWebhook(rawBody, signature);

    const payload = JSON.parse(rawBody);
    console.log("Webhook event:", payload.type);

    res.status(200).json({ status: "ok" });

    const meetingId = payload.call?.custom?.meetingId;
    const agentId = payload.call?.custom?.agentId;
    const user=payload.call?.custom?.user;
    if (!meetingId) return;
 

    if (payload.type === "call.session_started") {

      setImmediate(async () => {
        try {
          if (!agentId) return console.error("Missing agentId");

          const agent = await Agent.findById(agentId);
          if (!agent) return console.error("Agent not found");

          await serverClient.upsertUsers([
            { id: agentId, name: agent.name, role: "user" }
          ]);

          const call = serverClient.video.call("default", meetingId);

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
            { type: "input_text", text: `Please greet the user name is ${user.name} and introduce yourself. Your name is ${agent.name}. Please do not change the topic if the users ask question irrelevant from the instruction. Try to tell the user that we are here only for the topic in the instruction.` }
          ]);

          realtimeClient.on("error", (err) => console.error("RealtimeClient error:", err));
          console.log("AI agent connected and speaking");

        } catch (err) {
          console.error("Async AI error:", err);
        }
      });
    } 
    if (payload.type === "call.session_participant_left") {
      const session = activeSessions[meetingId];
      if (!session) return;

      const whoLeft = payload.participant?.user_id;
      console.log("Participant left:", whoLeft, "| Agent is:", session.agentId);

      // The human user left → kill the agent
      if (whoLeft !== session.agentId) {
        console.log("User left — disconnecting agent...");
        await disconnectAgent(meetingId);
      }
    }
    if (payload.type === "call.session_ended") {
      await disconnectAgent(meetingId);
    }

  } catch (error) {

    console.error("Webhook error:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Webhook failed" });
    }
  }
};

async function disconnectAgent(meetingId) {
  const session = activeSessions[meetingId];
  if (!session) return;

  try {
    await session.realtimeClient.close();
    delete activeSessions[meetingId];
    console.log(`Agent disconnected for meeting: ${meetingId}`);
  } catch (err) {
    console.error("Error closing agent session:", err);
  }
}

module.exports = { webhook }; 