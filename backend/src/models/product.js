const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: [{ type: String, required: true }],
    description: { type: String, required: true },

    category: {
      type: String,
      required: true,
      lowercase: true,
    
    },
    brand: { type: String, required: true, lowercase: true },
    unit: { type: String, required: true },

    stock: { type: Number, required: true, min: 0 },
       
 reviews: [
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number, required: true , max:5 ,min:1 },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }
],


    userAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Product", productSchema);
