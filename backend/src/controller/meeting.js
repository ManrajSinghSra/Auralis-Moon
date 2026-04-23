const { Meeting } = require("../model/Meeting");

const addMeeting=async(req,res)=>{

  try { 
      const {title,agentId}=req.body;
      const user=req.user  
      if(!title || !agentId){
           return res.status(404).json({error:"Details must be provided"});
        }

    const newMeeting=new Meeting({title,userId:user._id,agentId,agentId})

    const isExists=await Meeting.findOne({title,agentId,userId:user._id});

    if(isExists){
      throw new Error("Meeting already exists.");
    }

    await newMeeting.save()

    return res.status(200).json({data:"Created"})
    
  } catch (error) {
    res.status(400).json({error:error.message || "Something went wrong  in meeting Creation"})
  }
}

const getMeeting=async(req,res)=>{
  try {
    const user=req.user;
    
    const data=await Meeting.find({userId:user._id}).populate("agentId")
    return res.json({data});
  } catch (error) {
    return res.json({error:error.message || "Something went wrong"});
  }
}

const meetingDetail=async(req,res)=>{

  try {
    const user=req.user;
    const {meetId}=req.body;
    const data=await Meeting.findOne({userId:user._id,_id:meetId});
    return res.json({data});
    
  } catch (error) {
     res.json({error:error.message || "Something went wrong"});
  }
}

module.exports={addMeeting,getMeeting,meetingDetail}