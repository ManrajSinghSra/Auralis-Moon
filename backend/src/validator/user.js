const validator=require("validator")

const validateSignUp=(value)=>{
 const {name,email,password}=value;

   if(!name || !email || !password){
    throw new Error("Fields are Required.")
   }

   if(!validator.isEmail(email)){
        throw new Error("Email is Invalid.");
   }

   if(name.length>31){
    throw new Error("Field data is Inconsistant.");
   }

   if(password.length<6){
    throw new Error("Password is too short..");
   }
   
}


const validateLogin=(value)=>{
 const {email,password}=value;

   if(!email || !password){
    throw new Error("Fields are Required.")
   }

   if(!validator.isEmail(email)){
        throw new Error("Email is Invalid.");
   }
}



module.exports={validateSignUp,validateLogin}