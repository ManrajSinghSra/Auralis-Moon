const express=require("express");
const cookieParser=require("cookie-parser");
const cors=require("cors");

const { userRouter } = require("./router/user");
const { agentRouter } = require("./router/agent");
const { meetingRouter } = require("./router/meeting");
const { streamRouter } = require("./router/streamToken");
const { webhookRouter } = require("./router/webhook");


const {inngest} = require("./inngest/Inngest");
const {serve}=require("inngest/express");
const { meetingProcessing } = require("./inngest/functions");
const { inngestRouter } = require("./inngest/inngestTest");

const app=express();

app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(cookieParser());

app.use("/ai",webhookRouter);

app.use(express.json());

app.use("/user",userRouter)
app.use("/agent",agentRouter);
app.use("/meeting",meetingRouter)

app.use("/stream",streamRouter)

app.use("/api/inngest",serve({client:inngest,functions:[meetingProcessing]}))

app.use("/test",inngestRouter);

module.exports={app}
