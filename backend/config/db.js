const mongoose = require("mongoose")


  const connectDb = async()=>{
  try{
       await mongoose.connect(process.env.MONGO_URI)
       
       console.log("mongoose successfully connected")
  }catch(e){
  console.log("mongoose is not connected", e)
  throw e
  
  } 
  }
  

  module.exports = connectDb