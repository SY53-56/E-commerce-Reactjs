require("dotenv").config();
const express = require("express");
const app = express();
const connectDb = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const UserRoutes = require("./src/router/user");

// Connect DB
connectDb();

// CORS FIX (MOST IMPORTANT)
app.use(
  cors({
    origin: "http://localhost:5173",   // your frontend URL
    credentials: true,                 // allow cookies
  })
);
console.log("JWT Secret:", process.env.JWT);

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes

app.get("/test", (req, res) => {
  console.log("COOKIES:", req.cookies);
  res.send(req.cookies);
});

app.use("/user", UserRoutes);

// Start server
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server running on port", port);
});
