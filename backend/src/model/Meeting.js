const mongoose=require("mongoose");

const meetingSchema=mongoose.Schema({
    title:{
        type:String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    agentId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Agent"
    },
    status:{
        type:String,
        default:"upcoming",
        enum:["upcoming","active","completed","processing","cancelled"]
    },
    summary:      { type:Date },
    transcriptUrl:{ type:String },
    recordingUrl: { type:String },
    
    

},{timestamps:true})

const Meeting=mongoose.model("meeting",meetingSchema);



module.exports={Meeting};