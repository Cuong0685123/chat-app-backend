import ConversationService from "../service/conversation.service.js";

class ConversationController {
  async create(req, res) {
    try {
      const { userIds } = req.body;
      const conversation = await ConversationService.createConversation({
        members: userIds,
      });
      return res.status(201).json({ data: conversation });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const conversation = await ConversationService.getConversationByUserId(
        req.userId
      );
      return res.status(201).json({ data: conversation });
    } catch (error) {
      return res.status(404).json({ message: "cant not find" });
    }
  }
  async update(req, res) {
    try {
      const{conversationId} = req.params;
      const{memberId} = req.body;
      const conversation = await ConversationService.updateConversation(
        conversationId,
        memberId
      );

      return res.status(201).json({ data: conversation });
    } catch (error) {
      console.error("Error adding member to conversation:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  async delete(req, res) {
    try {
      const { conversationId, memberId } = req.body;
      const conversation = await ConversationService.deleteMember(
        conversationId,
        memberId
      );
      return res.status(201).json({ data: conversation });
    } catch (error) {
      console.error("Error removing member from conversation:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
const conversationController = new ConversationController();
export default conversationController;
