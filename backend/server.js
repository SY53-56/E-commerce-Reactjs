require("dotenv").config()
const express =require("express")
const app = express()
const connectDb= require("./config/db")

connectDb()
const port= process.env.PORT
app.listen(port,()=>{
    console.log("sahul")
})