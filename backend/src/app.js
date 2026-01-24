const express=require("express");
const cookieParser=require("cookie-parser");
const cors=require("cors");

const { userRouter } = require("./router/user");
const { agentRouter } = require("./router/agent");

const app=express();

app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(cookieParser());

app.use(express.json());

app.use("/user",userRouter)
app.use("/agent",agentRouter);

module.exports={app}
