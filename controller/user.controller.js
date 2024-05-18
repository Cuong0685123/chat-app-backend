import userService from "../service/user.service.js";
import { StatusCodes } from "http-status-codes";

class UserController {
  async getUserInfo(req, res, next) {
    try {
      const { userId } = req;
      const user = await userService.getUserInfo(userId);
      return res.status(StatusCodes.OK).json(user);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res) {
    try {
      const { userId } = req.params;
      const { displayName, avatar } = req.body;

      const uploadedFilesUrls = req.file?.location; 
      const updatedUser = await userService.updateUser(userId, {
        displayName,
        avatar: uploadedFilesUrls,
      });
      res
        .status(200)
        .json({ data: updatedUser });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  async findUserByPhoneNumber(req, res) {
    try {
      const { phoneNumber } = req.params;
      const user = await userService.findUserByPhoneNumber(phoneNumber);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ data: user });
    } catch (error) {
      console.error("Error finding user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }}


const userController = new UserController();
export default userController;
