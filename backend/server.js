require("dotenv").config();
const express = require("express");
const app = express();
const connectDb = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const UserRoutes = require("./src/router/user");
const ProductRouter = require("./src/router/product");
const CartRouter = require("./src/router/cart");
const Order = require("./src/router/order");

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL||"http://localhost:5173",
    credentials: true,
  })
);
   
// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/user", UserRoutes);
app.use("/product", ProductRouter);
app.use("/cart", CartRouter);
app.use("/order" , Order)
// ✅ START SERVER ONLY AFTER DB CONNECTS
const port= process.env.PORT ||5000

  app.get("/",(req,res)=>{
    res.send("hii sahul")
  })
const startServer = async () => {
  try {
    await connectDb(); // ⬅️ THIS FIXES EVERYTHING
    app.listen(port, () => {
      console.log("Server running on port", port);
    });
  } catch (err) {
    console.error("Failed to start server ❌", err);
    process.exit(1);
  }
};

startServer();
