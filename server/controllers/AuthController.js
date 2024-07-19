import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

// User registration
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_KEY || "JWTSECRETkey",
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "User created successfully", token, user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

// user login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_KEY || "JWTSECRETkey",
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "Login successfully", token, user });
  } catch (error) {
    console.error("Error logging User:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
