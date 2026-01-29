const { Meeting } = require("../model/Meeting");

const addMeeting=async(req,res)=>{

  try {
      const {title}=req.body;
      const user=req.body

      if(!meetingName){
            res.status(404).json({error:"Name must be Provided of meeting"});
        }

    const newMeeting=new Meeting({title,userId:user._id,agentId})

    await newMeeting.save()
  } catch (error) {
    res.json({error:error.message || "Something went wrong  in meeting Creation"})
  }
}

module.exports={addMeeting}