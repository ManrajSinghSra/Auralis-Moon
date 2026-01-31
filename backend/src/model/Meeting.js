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
        type:String,
        default:"upcoming",
        enum:["upcoming","active","completed","processing","cancelled"]
    },

    summary:      { type:Date },
    transcriptUrl:{ type:Date },
    recordingUrl: { type:Date },
    

},{timestamps:true})

const Meeting=mongoose.model("meeting",meetingSchema);

module.exports={Meeting};