const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const userAuthentication = async (req, res, next) => {
  try {
    let token;

    // 1️⃣ Read token from Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT);

    // 3️⃣ Attach user
    req.user = await UserModel.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = userAuthentication;
