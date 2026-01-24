const { Auth } = require("../Auth/auth");
const { signUp ,login,profile, logout} = require("../controller/user");

const express=require("express"); 
const userRouter=express.Router()

userRouter.post("/signup",signUp)
userRouter.post("/login",login)

userRouter.get("/profile",Auth,profile);


userRouter.get("/logout",Auth,logout)

module.exports={userRouter}