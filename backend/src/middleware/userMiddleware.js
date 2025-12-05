const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const userAuthentication = async (req, res, next) => {
  try {
   
    const {token}  = req.cookies;
     console.log("REQ COOKIES =", req.cookies);
console.log("sahul token", token)
    // No token
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT);

    // Find user
    req.user = await UserModel.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next(); // Continue to route
  } catch (e) {
    res.status(401).json({
      message: "Invalid or expired token",
      error: e.message,
    });
  }
};

module.exports = { userAuthentication };
