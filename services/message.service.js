import Message from "../models/messages.model.js";

class MessageService {
    async sendMessage  (messageData)  {
        try {
          const { conversationId, text, images, files, recallAt, deleteAt, senderId } = messageData;
          const newMessage = new Message({
            conversationId,
            text,
            images,
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
      };

}
const messageService = new MessageService();
export default messageService;