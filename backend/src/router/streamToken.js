const express=require("express");
const streamRouter=express.Router();
const { Auth } = require("../Auth/auth");
const { streamaApiKey, streamSecret } = require("../../Secret");
const { Meeting } = require("../model/Meeting");


const {StreamClient }= require ("@stream-io/node-sdk"); 
const serverClient = new StreamClient(streamaApiKey, streamSecret);

  
streamRouter.post("/generate-token",Auth, async(req, res) => {

  const  user  = req.user;

  const {callId,agentId}=req.body;

  if(!callId){
    return res.status(400).json({error:"Call Id Required"});
  }

  const meeting=await Meeting.findById(callId);
  const call=serverClient.video.call("default",callId);


  const userId=user._id.toString();  

  await call.getOrCreate({
      data: {
        created_by_id: userId,
        custom: {
          meetingId: callId,
          agentId
        },
        settings_override: {
          transcription: {
            mode: "auto-on",
            language: "en",
          },
        },
      },
    }); 
  
  const token = serverClient.createToken(userId);
  res.json({ token});

});

module.exports={streamRouter}