const express=require("express");
const { Auth } = require("../Auth/auth");
const { addMeeting } = require("../controller/meeting");
const meetingRouter=express.Router();



meetingRouter.post("/newMeeting/add",Auth,addMeeting);

module.exports={meetingRouter}
