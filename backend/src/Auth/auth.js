const  jwt  = require("jsonwebtoken");
const { User } = require("../model/User");

const Auth=async(req,res,next)=>{

    try {

        const token=req.cookies.token

        if(!token){
            throw new Error("Please Login..")
        }

        const userData= jwt.verify(token,"perfu3worf");
        const {_id}=userData;
        const user=await User.findById(_id);

        if(!user){
            throw new Error("Invalid User");
        }
    
        req.user=user;
        next()
        
    } catch (error) {
        res.status(401).json({error:error.message})
    }
}

module.exports={Auth}