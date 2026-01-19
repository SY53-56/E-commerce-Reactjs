const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,   // ✅ FIX HERE
      username: user.username,
      email: user.email,
      role: user.role
    },
    process.env.JWT_TOKEN,
    { expiresIn: "7d" }
  );
};




const userRegister = async (req, res) => {
  try {
    const { email, username, password ,role,  phone } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      email,
      username,
      password: hashedPassword,
      phone,
     role
    });

    const token = generateToken(newUser);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
        phone: newUser.phone,
      },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExist = await UserModel.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "Email not found" });
    }

    const passwordCompare = await bcrypt.compare(password, userExist.password);
    if (!passwordCompare) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = generateToken(userExist);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Successful login",
      user: {
        id: userExist._id,
        email: userExist.email,
        username: userExist.username,
        role: userExist.role,
      },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const userLogout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
let user = async (req, res) => {
  const { id, email, role } = req.user;
  res.json({
    user: { id, email, role }
  });
};

module.exports = { userRegister, userLogin, userLogout,user };
