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
      return res.status(404).json({ message: "cant not create" });
    }
  }

  async getById(req, res) {
    try {
      const { userId } = req.params;
      const conversation = await ConversationService.getConversationByUserId(
        userId
      );
      return res.status(201).json({ data: conversation });
    } catch (error) {
      return res.status(404).json({ message: "cant not find" });
    }
  }
  async add(req, res) {
    try {
      const { conversationId, memberId } = req.body;
      const conversation = await ConversationService.addMember(
        conversationId,
        memberId
      );

     return res.status(201).json({data:conversation});
    } catch (error) {
      console.error("Error adding member to conversation:", error);
    return res.status(500).json({ error: "Internal server error" });
    }
  }
  async delete(req, res) {
    try {
      const { conversationId, memberId } = req.params;
      const conversation = await ConversationService.deleteMember(
        conversationId,
        memberId
      );
      return res.status(201).json({data:conversation});
    } catch (error) {
      console.error("Error removing member from conversation:", error);
    return res.status(500).json({ error: "Internal server error" });
    }
  }
}
const conversationController = new ConversationController();
export default conversationController;
