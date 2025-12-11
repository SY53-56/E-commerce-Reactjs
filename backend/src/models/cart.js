const mongoose = require("mongoose")

const cartSchems=  new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
  item:[{type:mongoose.Schema.Types.ObjectId,ref:"product",required:true},{quantity:1}]

})
module.exports = mongoose.model("cart",cartSchems)