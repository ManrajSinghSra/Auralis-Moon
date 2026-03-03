const express=require("express");
const cookieParser=require("cookie-parser");
const cors=require("cors");

const { userRouter } = require("./router/user");
const { agentRouter } = require("./router/agent");
const { meetingRouter } = require("./router/meeting");
const { streamRouter } = require("./router/streamToken");
const { webhookRouter } = require("./router/webhook");

const app=express();

app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(cookieParser());

app.use("/ai",webhookRouter);
app.use(express.json());

app.use("/user",userRouter)
app.use("/agent",agentRouter);
app.use("/meeting",meetingRouter)

app.use("/stream",streamRouter)


module.exports={app}
