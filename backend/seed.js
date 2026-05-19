require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./src/models/product");
const data = require("./src/project/data");

mongoose.connect(process.env.MONGOOSE_URL);

const seed = async () => {
  try {
   
await Product.deleteMany()
    await Product.insertMany(data);

    console.log("Products Inserted");

    process.exit();
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

seed();