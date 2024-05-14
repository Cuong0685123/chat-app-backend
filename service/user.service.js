import User from "../model/user.model.js";
import { UserNotFoundError } from "../error/user.error.js";
import mongoose from "mongoose";

class UserService {
  async getUserInfo(userId) {
    const _userId = new mongoose.Types.ObjectId(userId);
    const filter = {
      _id: _userId,
    };

    const userFounded = await User.findOne(filter).exec();

    if (!userFounded) {
      throw new UserNotFoundError(`User with id: ${userId} not found!`);
    }

    return userFounded;
  }
  async updateUser(userId, userData) {
    try {
      const updateFields = {};
      for (const [key, value] of Object.entries(userData)) {
        if (User.schema.obj.hasOwnProperty(key)) {
          updateFields[key] = value;
        }
      }
      const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
        new: true,
      });
      if (!updatedUser) {
        throw new Error("User not found");
      }

      return updatedUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

const userService = new UserService();
export default userService;
