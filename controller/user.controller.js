import userService from "../service/user.service.js";
import {StatusCodes} from "http-status-codes";

class UserController {
    async getUserInfo(req, res, next) {
        const {userId} = req.body;
        try {
            const user = await userService.getUserInfo(userId);

            return res.status(StatusCodes.OK).json(user);
        } catch (error) {
            next(error)
        }
    }

    async  update(req, res) {
        const userId = req.params.userId; // Đảm bảo bạn có route parameter userId trong đường dẫn API
        const userData = req.body;
        console.log(req.body)
        try {
          const updatedUser = await userService.updateUser(userId, userData);
          res.status(200).json({ data: updatedUser });
        } catch (error) {
          console.error("Error updating user:", error);
          res.status(500).json({ error: "Internal server error" });
        }
      }

}

const userController = new UserController();
export default userController;