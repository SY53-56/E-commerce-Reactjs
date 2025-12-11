const mongoose = require("mongoose")


const productSchema= mongoose.Schema({
    name:{type:string},
    price:{type:Number, required:true},
    image:{type:String},
    description:{type:String},
   category: {type:String},
   userAdmin:{ type: Types.ObjectId, ref: "User", required: true }
})

module.exports= mongoose.model("product",productSchema)