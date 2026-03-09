const mongoose=require("mongoose");
const { Meeting } = require("./Meeting");

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
        required:true
    }

},{timestamps:true})

agentSchema.pre("findOneAndDelete",async function(){

    const agent=await this.model.findOne(this.getFilter());
    if(agent){
        await Meeting.deleteMany({agentId:agent._id});
    } 
})

const Agent=mongoose.model("Agent",agentSchema);


module.exports={Agent};