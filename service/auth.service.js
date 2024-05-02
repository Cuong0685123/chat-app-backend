import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/users.model.js";

class AuthServices {
  async signup(userData) {
    try {
      const { phoneNumber, password, displayName, avatar } = userData;

      const phoneNumberPattern = /^\d{10,11}$/;
      if (!phoneNumberPattern.test(phoneNumber)) {
        throw new Error("Invalid phone number");
      }
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }

      const existingUser = await User.findOne({ phoneNumber });
      if (existingUser) {
        throw new Error("Phone number already registered");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        phoneNumber,
        password: hashedPassword,
        displayName,
        avatar,
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

      return { accessToken, refreshToken, user: savedUser };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async login(phoneNumber, password) {
    try {
      if (!phoneNumber || !password) {
        throw new Error("Phone number and password are required");
      }
      const user = await User.findOne({ phoneNumber });
      if (!user) {
        throw new Error("User not found");
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid phone number or password");
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",


      });
      return { message: "Login successful", token };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  
}

const authServices = new AuthServices();

export default authServices;
