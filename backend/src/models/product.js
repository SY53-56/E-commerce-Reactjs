const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    image: [{ type: String, required: true }],
    description: { type: String, required: true },

    category: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },
    brand: { type: String, required: true, lowercase: true },
    unit: { type: String, required: true },

    stock: { type: Number, required: true, min: 0 },

    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },

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
