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



  async  getAllMessages(conversationId, page = 1, limit = 5) {
    try {
      const skip = Math.max(0, (page - 1) * limit);
  
      // Lấy trang tin nhắn hiện tại với skip và limit, sắp xếp theo thứ tự tăng dần của _id
      const messagesPage = await Message.find({ conversationId })
      .sort({ createdAt: 1 }) // Sắp xếp tin nhắn theo thứ tự tăng dần của createdAt
      .skip(skip)
      .limit(limit)
      .populate('senderId', 'phoneNumber displayName avatar');
  
      return {
        messages: messagesPage // Đảo ngược thứ tự của tin nhắn trước khi trả về
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
}

const messageService = new MessageService();
export default messageService;
