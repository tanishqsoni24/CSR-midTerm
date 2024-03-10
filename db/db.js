const mongoose = require("mongoose")


const connectDb = async ()=>{
    try{
       const conn = await mongoose.connect("mongodb://localhost:27017/UserProfile")
        console.log("Database Connected !! DB HOST :", conn.connection.host )
    }
    catch(error){
        console.log(error.message)
    }
}

module.exports = connectDb;