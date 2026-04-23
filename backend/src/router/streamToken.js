const express=require("express");
const streamRouter=express.Router();
const { Auth } = require("../Auth/auth"); 
const {tokenGenerator } = require("../controller/tokenGenerator");
  

streamRouter.post("/generate-token",Auth,tokenGenerator);

module.exports={streamRouter}