import Friend from "../models/friends.model.js";
import Conversation from "../models/conversations.model.js";

class FriendServices {
  async addFriend(senderId, receiverId) {
    try {
      const existingFriendship = await Friend.findOne({ senderId, receiverId });
      if (existingFriendship) {
        throw new Error("Friendship already exists");
      }
      const newFriendship = new Friend({
        senderId,
        receiverId,
      });
      const savedFriendship = await newFriendship.save();

      return savedFriendship;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async acceptInvitation(senderId, receiverId) {
    try {
      const invitation = await Friend.findOneAndUpdate(
        { senderId, receiverId },
        { status: "accepted" },
        { new: true }
      );

      if (!invitation) {
        throw new Error("Friendship not found");
      }

      const conversation = new Conversation({
        members: [senderId, receiverId],
      });
      const newConversation = await conversation.save();
      return newConversation;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

const friendService = new FriendServices();
export default friendService;
