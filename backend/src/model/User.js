const mongoose=require("mongoose");
const validator=require("validator")


const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        validate(value){
            if(value==""){
                throw new Error("Email is Empty");
            }
            else if(!validator.isEmail(value)){
                throw new Error("Email is not valid")
            }
        }
    },
    name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        minLength:[2,"Name is too Short"],
        maxLength:30
    },
    password:{
        type:String,
        required:true,
        minLength:[5,"Password is too Short"],
        maxLength:90,
        select:false
    }
},{
    timestamps:true
})

userSchema.methods.getToken=async function(){
    const user=this;
    
    const token=jwt.sign({_id:user._id},"perfu3worf",{
        expiresIn:"1d"
    })
    
    return token;
}

userSchema.methods.verifyPassword=async function(password){

    const isValidPassword=await bcrypt.compare(password,this.password);
    return isValidPassword
}

const User=mongoose.model("User",userSchema);
module.exports={User}
