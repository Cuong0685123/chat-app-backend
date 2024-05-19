import Message from "../model/message.model.js";
import User from "../model/user.model.js";
import Conversation from "../model/conversation.model.js";

class MessageService {
  async sendMessage(messageData) {
    try {
      const { conversationId, text, files, recallAt, deleteAt, senderId } =
        messageData;

      const newMessage = new Message({
        conversationId,
        text,
        files,
        recallAt,
        deleteAt,
        senderId,
      });

      const savedMessage = await newMessage.save();
      const conversation = await Conversation.findOneAndUpdate(
        { _id: conversationId },
        { $set: { message: savedMessage._id } },
        { new: true }
      );
      if (!conversation) {
        throw new Error("Conversation not found");
      }
      const sender = await User.findById(senderId);
      if (!sender) {
        throw new Error("Sender not found");
      }

      const messageWithSenderInfo = {
        ...savedMessage.toObject(),
        sender: {
          id: sender._id,
          friend: sender.friend,
          phoneNumber: sender.phoneNumber,
          displayName: sender.displayName,
          avatar: sender.avatar,
        },
      };

      return messageWithSenderInfo;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async revokeMessage(messageId) {
    try {
      const message = await Message.findByIdAndUpdate(
        messageId,
        { revoked: true },
        { new: true }
      );
      if (!message) {
        throw new Error("Message not found");
      }
      return { success: true, message: "Message revoked successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  }



  async getAllMessages(conversationId, page = 1, limit = 5) {
    try {
      const skip = (page - 1) * limit;
      const messages = await Message.find({ conversationId })
        .skip(skip)
        .limit(limit)
        .populate('senderId', 'phoneNumber displayName avatar') 

      const formattedMessages = messages.map((message) => {
        const messageObject = message.toObject();
        if (message.revoked) {
          return {
            ...messageObject,
            text: null,
            files: null,
            sender: message.senderId, 
          };
        } else {
          return {
            ...messageObject,
            sender: message.senderId, 
          };
        }
      });

      const totalMessages = await Message.countDocuments({ conversationId });
      const totalPages = Math.ceil(totalMessages / limit);

      return {
        page,
        totalPages,
        limit,
        messages: formattedMessages,
      };
    } catch (error) {
      throw new Error(error.message);
    }
}

}


const messageService = new MessageService();
export default messageService;
