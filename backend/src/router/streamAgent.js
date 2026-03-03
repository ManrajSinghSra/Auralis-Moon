const express=require("express")
const streamRouter=express.Router();

const {GoogleGenerativeAI} =require("@google/generative-ai")

const {StreamClient} =require("@stream-io/node-sdk");
const { streamaApiKey, streamSecret, GeminiAPIKEY } = require("../../Secret");


const genAI=new GoogleGenerativeAI(GeminiAPIKEY)

// const model=genAI.getGenerativeModel({model:})