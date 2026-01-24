const mongoose=require("mongoose")

const agentSchema=mongoose.Schema({
    name:{
        type:String,
        trim:true,
        lowercase:true
    },
    instruction:{
        type:String,
        trim:true,
        lowercase:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    }

},{timestamps:true})

const Agent=mongoose.model("agent",agentSchema);

module.exports={Agent};