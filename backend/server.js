require("dotenv").config();
const express = require("express");
const app = express();
const connectDb = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const UserRoutes = require("./src/router/user");
const ProductRouter = require("./src/router/product");
const CartRouter = require("./src/router/cart");

// CORS
app.use(
  cors({
    origin: "http://localhost:5174",
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

// ✅ START SERVER ONLY AFTER DB CONNECTS
const PORT = 5000;

const startServer = async () => {
  try {
    await connectDb(); // ⬅️ THIS FIXES EVERYTHING
    app.listen(PORT, () => {
      console.log("Server running on port", PORT);
    });
  } catch (err) {
    console.error("Failed to start server ❌", err);
    process.exit(1);
  }
};

startServer();
