const express=require("express"); 
const { addAgent,allAgent, deleteAgent } = require("../controller/agent");
const { Auth } = require("../Auth/auth");

const agentRouter=express.Router();

agentRouter.post("/addAgent",Auth,addAgent);

agentRouter.get("/allAgent",Auth,allAgent);

agentRouter.post("/delete",Auth,deleteAgent);

module.exports={agentRouter}