import Message from "../model/message.model.js";

class MessageService {
  async sendMessage(messageData) {
    try {
      const {
        conversationId,
        text,
        files,
        recallAt,
        deleteAt,
        senderId,
      } = messageData;
      const newMessage = new Message({
        conversationId,
        text,
        files,
        recallAt,
        deleteAt,
        senderId,
      });
      const savedMessage = await newMessage.save();
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
  
  async  getAllMessages  (conversationId)  {
    try {
      const messages = await Message.find({ conversationId });
      return messages;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
const messageService = new MessageService();
export default messageService;
