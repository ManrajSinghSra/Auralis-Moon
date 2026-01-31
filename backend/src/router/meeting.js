const express=require("express");
const { Auth } = require("../Auth/auth");
const { addMeeting, getMeeting } = require("../controller/meeting");
const meetingRouter=express.Router();



meetingRouter.post("/add",Auth,addMeeting);
meetingRouter.get("/all",Auth,getMeeting)

module.exports={meetingRouter}
