const mongoose=require("mongoose");
const { URL } = require("../../Secret");

const  connectDB=async()=>{
    try {
        await mongoose.connect(URL);
    } catch (error) {
       console.error("MongoDb Connection failed");
       throw error;
    }
}

module.exports={connectDB};