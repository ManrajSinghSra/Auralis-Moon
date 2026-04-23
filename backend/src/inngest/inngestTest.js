const { inngest } = require("./Inngest");

const express=require("express");
const inngestRouter=express.Router();

inngestRouter.get("/",async(req,res)=>{
    await inngest.send({
    name: "meeting/processing",
    data: { meetingId: "123" }
});

})

module.exports={inngestRouter}