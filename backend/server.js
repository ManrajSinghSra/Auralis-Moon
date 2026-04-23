const http=require("http");
const { app } = require("./src/app");
const { connectDB } = require("./src/config/db");


const server=http.createServer(app);

const startServer=async()=>{    
     try {
        await connectDB()
        console.log("DB Connected")
        server.listen(4001,()=>console.log("Server is Listening on Port ",4001));
        
     } catch (error) {
        console.log(error);
     }
}


startServer()