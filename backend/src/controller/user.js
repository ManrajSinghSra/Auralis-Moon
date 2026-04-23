const { validateSignUp, validateLogin } = require("../validator/user");
const bcrypt=require("bcrypt");

const { User } = require("../model/User"); 

const signUp=async(req,res)=>{

    try {
        validateSignUp(req.body)
        const {name,email,password}=req.body; 

        const isExists=await User.findOne({email})

        if(isExists){
            throw new Error("User already exists. Please login....");
        }
        
        const user=new User({
            name,email,password:await bcrypt.hash(password,10)
        })
 
        await user.save();

        const token=await user.getToken();

        res.cookie("token",token,{
            expires:new Date(Date.now()+1*3600000)
        })


        res.send("User is Created")
        
    } catch (error) { 
        res.send({error:error.message})
    }

}
const login=async(req,res)=>{
    try {

        validateLogin(req.body)
        const {email,password}=req.body; 

        const user=await User.findOne({email}).select("+password")

        if(!user){
            throw new Error("Invalid Credentials");
        }

        const pass=await user.verifyPassword(password)
        if(!pass){
              throw new Error("Invalid Credentials");
        }

             
        const token=await user.getToken();

        res.cookie("token",token,{
            expires:new Date(Date.now()+1*3600000)
        })
        res.status(200).send({success:true,data:user});
        
    } catch (error) { 
        res.status(400).send({error:error.message})
    }

}

const profile=async(req,res)=>{
    try {

        res.json({data:req.user})
 
        
    } catch (error) {
        
    }
}

const logout=async(req,res)=>{

  try {
      res.clearCookie("token");
      res.status(200).json({message:"Logout Successfully"});
  } catch (error) {
    res.status(500).json({error:"There is an Error"});    
  }

}

module.exports={signUp,login,profile,logout}