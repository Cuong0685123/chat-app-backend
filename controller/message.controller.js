import MessageService from "../service/message.service.js";
import { StatusCodes } from "http-status-codes";
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
      res.status(StatusCodes.OK).json({data:result});
    } catch (error) {
      console.error("Error revoking message:", error);
      res.status(StatusCodes.OK).json({ error: "Internal server error" });
    }
  }

  async getAll(req, res) {
    try {
      const { conversationId } = req.params;
      const { page = 1, limit = 5 } = req.query;

      const result = await MessageService.getAllMessages(conversationId, parseInt(page), parseInt(limit));
      res.status(200).json({ data: result });
    } catch (error) {
      console.error("Error retrieving messages:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}


const messageController = new MessageController();
export default messageController;
