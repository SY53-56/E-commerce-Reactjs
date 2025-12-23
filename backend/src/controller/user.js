const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  if (!process.env.JWT) {
    throw new Error("JWT_TOKEN is not set in environment variables");
  }

  return jwt.sign(
    { id: user._id, username: user.username, email: user.email, role:user.role },
    process.env.JWT,
    { expiresIn: "7d" } // Token valid for 7 days
  );
};


console.log("JWT Secretgzhzhkjzh:", process.env.JWT);

const userRegister = async (req, res) => {
  try {
    const { email, username, password ,role,  phone } = req.body;

    // Validate Inputs
    if (!email || !username || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check Existing User
    const existingUser = await UserModel.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create New User
    const newUser = await UserModel.create({
      email,
      username,
      password: hashedPassword,
      phone
    });
  console.log(newUser)
    // Generate JWT
    const token = generateToken(newUser);
console.log( "token by sahul",token)
    // Send Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only HTTPS in production
      sameSite: "lax",
      maxAge:7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        role:newUser.role,
        phone:newUser.phone
      },token
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};


const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check user exists
    const userExist = await UserModel.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "Email not found" });
    }
  console.log(email)
    // Compare password
    const passwordCompare = await bcrypt.compare(password, userExist.password);

    if (!passwordCompare) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate JWT
    const token = generateToken(userExist);
console.log(token)
    // Send token
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",

      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Successful login",
      user: {
        id: userExist._id,
        email: userExist.email,
        username: userExist.username,
      },token
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};


const userLogout = async (req, res) => {
  try {
    req.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = { userRegister, userLogin, userLogout };
