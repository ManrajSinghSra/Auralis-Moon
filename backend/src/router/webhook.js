require("dotenv").config()
const { streamApiKey, streamSecret } = require("../../Secret");

const {StreamClient }= require ("@stream-io/node-sdk"); 
const serverClient = new StreamClient(streamApiKey, streamSecret);


const express =require("express")
 
const webhookRouter=express.Router();



webhookRouter.post(
  "/webhook",
  express.raw({ type: "*/*" }),

  async (req, res) => {
    try {
      const signature = req.headers["x-signature"];

      if (!signature) {
        return res.status(400).json({ error: "Missing signature" });
      }

      const rawBody = req.body.toString("utf8");

      serverClient.verifyWebhook(rawBody, signature);

      const payload = JSON.parse(rawBody);
      
      console.log("Webhook type:", payload.type);
      console.log("Custom data:", payload.call?.custom);

      res.status(200).json({ status: "ok" });

      if (payload.type !== "call.session_started") return;

      setImmediate(async () => {
        try {
          const meetingId = payload.call.custom?.meetingId;
          const agentId = payload.call.custom?.agentId;

          if (!meetingId || !agentId) {
            console.error("Missing meetingId or agentId");
            return;
          }

          await serverClient.upsertUsers([
            { id: agentId, name: "AI Agent", role: "user" }
          ]);

          const call = serverClient.video.call("default", meetingId);

          const realtimeClient = await serverClient.video.connectOpenAi({
            call,
            openAiApiKey: process.env.OPENAI_API_KEY,
            agentUserId: agentId,
          });
 
          await realtimeClient.updateSession({
            instructions: "You are a helpful AI assistant in this meeting. Greet participants warmly when the call starts.",
            voice: "alloy",
            turn_detection: { type: "server_vad" },          // detects silence/speech
            input_audio_transcription: { model: "whisper-1" }, // optional but useful
          });

          // ✅ FIX 2: Use sendUserMessageContent (not sendClientEvent) to trigger first speech
          await realtimeClient.sendUserMessageContent([
            {
              type: "input_text",
              text: "Please greet the participants and introduce yourself."
            }
          ]);

          // ✅ FIX 3: Log errors from the realtime session
          realtimeClient.on("error", (err) => {
            console.error("RealtimeClient error:", err);
          });

          console.log("AI agent connected and speaking");

        } catch (err) {
          console.error("Async AI error:", err);
        }
      });

    } catch (error) {
      console.error("Webhook error:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Webhook failed" });
      }
    }
  }
);

module.exports={webhookRouter}