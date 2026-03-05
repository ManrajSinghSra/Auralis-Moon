const { webhook } = require("../controller/webHook");

const express =require("express");
const webhookRouter=express.Router();

webhookRouter.post("/webhook",express.raw({ type: "*/*" }), webhook);

module.exports={webhookRouter}