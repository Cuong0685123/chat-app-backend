import MessageService from "../service/message.service.js";

class MessageController {
  async send(req, res) {
    try {
      const {
        conversationId,
        text,
        files,
        recallAt,
        deleteAt,
        senderId,
      } = req.body;
      const uploadedFilesUrls = req.files?.map((file) => file.location) ?? [];
      const savedMessage = await MessageService.sendMessage({
        conversationId,
        text,
        files: uploadedFilesUrls,
        recallAt,
        deleteAt,
        senderId,
      });

      return res
        .status(201)
        .json({ message: savedMessage, uploadedFiles: uploadedFilesUrls });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error sending message", details: error.message });
    }
  }

  async revoked(req, res) {
    try {
      const { messageId } = req.params;
      const result = await MessageService.revokeMessage(messageId);
      res.status(201).json({data:result});
    } catch (error) {
      console.error("Error revoking message:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAll(req, res) {
    try {
      const { conversationId } = req.params;
      const messages = await MessageService.getAllMessages(conversationId);
      res.status(201).json({data: messages });
    } catch (error) {
      console.error("Error retrieving messages:", error);
      res
        .status(500)
        .json({ error: "Error retrieving messages", details: error.message });
    }
  }
}

const messageController = new MessageController();
export default messageController;