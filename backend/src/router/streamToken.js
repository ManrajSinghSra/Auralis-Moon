const express=require("express");
const { Auth } = require("../Auth/auth");

const {StreamClient }= require ("@stream-io/node-sdk");

const { streamaApiKey, streamSecret } = require("../../Secret");

const serverClient = new StreamClient(streamaApiKey, streamSecret);
const streamRouter=express.Router();

streamRouter.post("/generate-token",Auth, (req, res) => {

  const  user  = req.user;
  const userId=user._id.toString(); 
  const token = serverClient.createToken(userId);

  res.json({ token});
});

module.exports={streamRouter}