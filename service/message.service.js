import Message from "../model/message.model.js";
import {io}from  "../socket/socket.js";

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
      io.to(conversationId).emit('chat message', savedMessage);
      return savedMessage;
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
        .limit(limit);
  
      const formattedMessages = messages.map(message => {
        if (message.revoked) {
          const { _id, ...rest } = message.toObject();
          return {
            _id,
            revoked: true,
            ...rest,
            text: null,
            files: null
          };
        } else {
          return message.toObject();
        }
      });
      const totalMessages = await Message.countDocuments({ conversationId });
      const totalPages = Math.ceil(totalMessages / limit);
  
      return {
        page,
        totalPages,
        limit,
        messages: formattedMessages
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
const messageService = new MessageService();
export default messageService;
