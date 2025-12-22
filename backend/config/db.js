const mongoose = require("mongoose")


  const connectDb = async()=>{
  try{
       await mongoose.connect(process.env.MONGOOSE_URL)
       console.log("mongoose successfully connected")
  }catch(e){
  console.log("mongoose is not connected", e)
  } 
  }
  

  module.exports = connectDb