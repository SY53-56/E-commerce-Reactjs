const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: [{ type: String, required: true }],
  description: { type: String, required: true },
  category: { type: String, required: true ,  lowercase: true, index: true,},
  unit:{type:String, required:true},
  userAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
module.exports = mongoose.model("Product", productSchema);
