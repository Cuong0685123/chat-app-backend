import friendService from "../service/friend.service.js";
import { StatusCodes } from "http-status-codes";
class FriendController {
  async add(req, res) {
    try {
      const { senderId, receiverId } = req.body;
      const newFriendship = await friendService.addFriend(senderId, receiverId);
      res.status(201).json({ data: newFriendship });
    } catch (error) {
      console.error("Error adding friend:", error);
      res
        .status(500)
        .json({ error: "Error adding friend", details: error.message });
    }
  }
  async accept(req, res) {
    {
      try {
        const { receiverId } = req.params;
        const senderId = req.userId;
        const newConversation = await friendService.acceptInvitation(
          senderId,
          receiverId
        );
        res.status(201).json({ data: newConversation });
      } catch (error) {
        console.error("Error accepting friend invitation:", error);
        res
          .status(500)
          .json({
            error: "Error accepting friend invitation",
            details: error.message,
          });
      }
    }
  }

  async delete(req, res) {
    try {
      const { friendId } = req.params;
      const deletedInvitation = await friendService.deleteInvitation(friendId);
      res
        .status(201)
        .json({
          message: "Invitation deleted successfully",
          deletedInvitation,
        });
    } catch (error) {
      console.error("Error deleting invitation:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
const friendController = new FriendController();
export default friendController;
