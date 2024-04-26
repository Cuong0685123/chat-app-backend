import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/users.model.js";

export const signup = async (req, res) => {
  try {
    const phoneNumberPattern = /^\d{10,11}$/;
    if (!phoneNumberPattern.test(req.body.phoneNumber)) {
      return res.status(400).json({ error: "Invalid phone number" });
    }
    if (req.body.password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    const existingUser = await User.findOne({
      phoneNumber: req.body.phoneNumber,
    });
    if (existingUser) {
      return res.status(400).json({ error: "Phone number already registered" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      phoneNumber: req.body.phoneNumber,
      password: hashedPassword,
      displayName: req.body.displayName,
      avatar: req.body.avatar,
    });

    const savedUser = await newUser.save();

    const accessToken = jwt.sign(
      { userId: savedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { userId: savedUser._id },
      process.env.JWT_SECRET_REFRESH,
      { expiresIn: "7d" }
    );

    return res.status(201).json({ accessToken, refreshToken, user: savedUser });
  } catch (error) {
    return res.status(500).json({ error: "Error registering user" });
  }
};

export const login = async (req, res) => {
  try {
    if (!req.body.phoneNumber || !req.body.password) {
      return res
        .status(400)
        .json({ error: "Phone number and password are required" });
    }

    const user = await User.findOne({ phoneNumber: req.body.phoneNumber });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ error: "Invalid phone number or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    return res.status(500).json({ error: "Error logging in" });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ error: "Error logging out" });
  }
};
