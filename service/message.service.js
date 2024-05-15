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
      const formattedMessages = messages.map(message => {
        if (message.revoked) {
          const { _id, ...rest } = message.toObject();
          return {
            _id,
            revoked: true,
            ...rest,
            content: null,
            text:null,
            files: null
          };
        } else { 
          return message.toObject();
        }
      });
      return formattedMessages;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
const messageService = new MessageService();
export default messageService;
