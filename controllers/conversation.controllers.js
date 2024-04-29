import ConversationService from "../services/conversation.services.js";

class ConversationController {
  async create(req, res) {
    try {
      const { userIds } = req.body;
      const conversation = await ConversationService.createConversation({
        members: userIds,
      });
      return res.status(201).json({ data: conversation });
    } catch (err) {
      return res.status(404).json({ message: "cant not create" });
    }
  }

  async getById(req, res) {
    try {
      const { userId } = req.params;
      console.log(req.params)
      const conversation = await ConversationService.getCoversationByUserId(userId);
      return res.status(201).json({ data: conversation });
    } catch (err) {
      return res.status(404).json({ message: "cant not find" });
    }
  }
}
const conversationController = new ConversationController();
export default conversationController;
