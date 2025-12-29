const jwt = require("jsonwebtoken");

const userMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Please login" });
    }
    console.log("token",token)

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = decoded;

    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = userMiddleware;
