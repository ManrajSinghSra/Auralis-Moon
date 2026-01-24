const { Agent } = require("../model/Agent");

const addAgent=async(req,res)=>{

    try {

        const user=req.user;

        const {_id}=user

        const {name,instruction}=req.body;

        if(!name || !instruction){
            throw new Error("name and instructions are required");
        }
        const isExists=await Agent.findOne({name,instruction,userId:_id});

        if(isExists){
          throw new Error("Agent already Exists ")
        }
        const agent=new Agent({name,instruction,userId:_id});

        await agent.save();

        res.status(200).json({data:"Agent is Created Successfully"});
    } catch (error) {
       res.status(500).json({error:error.message || "Not Created"}); 
    }
}

const allAgent=async(req,res)=>{
    try {

        const page=parseInt(req.query.page);
        const limit=parseInt(req.query.limit);

        const user=req.user;
        const totalCount=await Agent.countDocuments({userId:user._id});

        const skip=(page-1)*limit;

        const allAgents=await Agent.find({userId:user._id}).skip(skip).limit(limit)

        res.json({data:allAgents,totalCount});
    } catch (error) {
        res.status(500).json({error:"Something went wrong"})
    }
}

module.exports={addAgent,allAgent}