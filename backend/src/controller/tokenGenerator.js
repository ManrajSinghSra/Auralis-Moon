const { Meeting } = require("../model/Meeting");

const {StreamClient }= require ("@stream-io/node-sdk"); 
const { streamApiKey, streamSecret } = require("../Secret");
const serverClient = new StreamClient(streamApiKey, streamSecret);

const tokenGenerator=async(req, res) => {
 
  const  user  = req.user;

  const {callId,agentId}=req.body;
 
  if(!callId || !agentId){
    return res.status(400).json({error:"Call Id and Agent Id are required"});
  }

  const meeting=await Meeting.findById(callId);

  if(!meeting){
    return res.status(404).json({error:"Meeting not found"});
  }
  if(meeting.userId.toString() !== user._id.toString()){
    return res.status(403).json({error:"Unauthorized"});
  }
  const call=serverClient.video.call("default",callId);

  const userId=user._id.toString(); 
  
  await call.getOrCreate({
        data: {
          created_by_id: userId,
        },
      });

  await call.update({
    custom: {
      meetingId: callId,
      agentId,
      user
    }
  });  

  const token = serverClient.createToken(userId);
  res.json({ token});
}

module.exports={tokenGenerator}
