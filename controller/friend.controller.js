import friendService from "../service/friend.service.js";
import { StatusCodes } from "http-status-codes";
import User from "../model/user.model.js";
import Friend from "../model/friend.model.js";
class FriendController {
  async add(req, res) {
    try {
      const { senderId, receiverId } = req.body;
      const newFriendship = await friendService.addFriend(senderId, receiverId);
      return res.status(StatusCodes.CREATED).json(newFriendship);
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json(error.message);
    }
  }
  async accept(req, res) {
    try {
      const { friendId } = req.params;
      console.log(req.params);

      const newConversation = await friendService.acceptInvitation(friendId);

      return  res.status(StatusCodes.OK).json(newConversation);
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json(error.message);
    }
  }

  async delete(req, res) {
    try {
      const { friendId } = req.params;
      const deletedInvitation = await friendService.deleteInvitation(friendId);
      res.status(StatusCodes.OK).json({
        message: "Invitation deleted successfully",
        deletedInvitation,
      });
    } catch (error) {

      res.status(StatusCodes.BAD_REQUEST).json({ error: "cant delete" });
    }
  }
  async getFriendList(req, res) {
    try {
      const { userId } = req;

      const friends = await friendService.getFriends(userId);

      res.status(StatusCodes.OK).json(friends);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách bạn bè:", error);

      res.status(StatusCodes.BAD_REQUEST).json({
        error: "Lỗi khi lấy danh sách bạn bè",
        details: error.message,
      });
    }
  }
  async getFriendRequests(req, res) {
    try {
      const{userId} = req;
      const friendRequests = await friendService.getPendingFriendRequestsByUserId(userId);
      res.status(200).json({ friendRequests: friendRequests });
    } catch (error) {
      res.status(500).json({ error: `Failed to get friend requests: ${error.message}` });
    }
  }
}
const friendController = new FriendController();
export default friendController;
