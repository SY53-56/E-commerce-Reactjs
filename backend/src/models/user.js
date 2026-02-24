const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Add role field
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  phone: { type: String },

  saveItem:[{type:mongoose.Types.ObjectId,ref:"Product"}]
}, { timestamps: true });

// Create and export the model
module.exports = mongoose.model("User", userSchema);
