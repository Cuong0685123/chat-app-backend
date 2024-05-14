import Friend from "../model/friend.model.js";
import Conversation from "../model/conversation.model.js";
import User from "../model/user.model.js";

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
      await User.findByIdAndUpdate(senderId,receiverId, {
        $push: { friends: senderId, receiverId }
      });
      return savedFriendship;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async acceptInvitation(senderId, receiverId ) {
    try {
      const existingConversation = await Conversation.findOne({
        members: { $all: [senderId, receiverId] },
      });
      if (existingConversation) {
        return existingConversation;
      }
      const invitation = await Friend.findOneAndUpdate(
        { senderId, receiverId },
        { status: 1 },
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
  async deleteInvitation(friendId) {
    try {
      const deletedInvitation = await Friend.findOneAndDelete({
        _id: friendId,
      });

      if (!deletedInvitation) {
        throw new Error("Invitation not found");
      }

      return deletedInvitation;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

const friendService = new FriendServices();
export default friendService;
