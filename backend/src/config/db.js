const mongoose=require("mongoose");

const  connectDB=async()=>{
    try {
        await mongoose.connect("mongodb+srv://srasinghmanraj:MynameisKhan1!@moon.sff0jqt.mongodb.net/Auralis");
    } catch (error) {
       console.error("MongoDb Connection failed");
       throw error;
    }
}

module.exports={connectDB};