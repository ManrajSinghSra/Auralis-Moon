const mongoose=require("mongoose");

const meetingSchema=mongoose.Schema({
    title:{
        type:String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
    },
    agentId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"Agent"
    },
    status:{
        default:"Upcoming",
        enum:["upcoming","active","completed","processing","cancelled"]
    },

    summary:      { type:String },
    transcriptUrl:{ type:String },
    recordingUrl: { type:String },
    

},{timestamps:true})

const Meeting=mongoose.model("meeting",meetingSchema);

module.exports={Meeting};