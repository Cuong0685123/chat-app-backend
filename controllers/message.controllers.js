import Message from "../models/messages.model.js";


export const sendMessage = async (req, res) => {
  try {
    const { conversationId, text, images, files, recallAt, deleteAt, senderId } = req.body;
    const uploadedFilesUrls = req.files?.map((file) => file.location) ?? [];
    const newMessage = new Message({
      conversationId: conversationId,
      text: text,
      images: uploadedFilesUrls,
      files: uploadedFilesUrls,
      recallAt: recallAt,
      deleteAt: deleteAt,
      senderId: senderId,
    });
    const savedMessage = await newMessage.save();

    return res.status(201).json({ message: savedMessage , uploadedFiles: uploadedFilesUrls});
  } catch (error) {
    return res.status(500).json({ error: "Error sending message", details: error.message });
  }
};
export const revokedMessage = async (req, res) => {
    try {
      const { senderId } = req.params;
      console.log({ senderId });
      const message = await Message.findById(senderId);
      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }
      await Message.findByIdAndDelete(senderId);
      res
        .status(200)
        .json({ succes: true, message: "Message delete successfully" });
    } catch (error) {
      console.error("Error revoking message:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };


export const getAllMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversationId });

    return res.status(200).json({ messages });
  } catch (error) {
    return res.status(500).json({ error: "Error retrieving messages", details: error.message });
  }
};

