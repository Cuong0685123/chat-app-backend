import Conversation from "../models/conversations.model.js";

class ConversationService {
  async getCoversationByUserId(userId) {
    try {
      const conversations = await Conversation.find({
        members: userId,
      }).populate("members");
      return conversations;
    } catch (error) {
      return {
        status: 404,
        message: "cant not find",
      };
    }
  }
  async createConversation(conversation) {
    try {
      const newConversation = await Conversation.create(conversation);
      return newConversation;
    } catch (error) {
      return {
        status: 404,
        message: "cant not creat",
      };
    }
  }
  async addMember(conversationId, memberId) {
    try {
      const conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        throw new Error("Conversation not found");
      }
      if (conversation.members.includes(memberId)) {
        throw new Error("Member already exists in conversation");
      }
      conversation.members.push(memberId);
      await conversation.save();
      return conversation;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteMember(conversationId, memberId) {
    try {
      const conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        throw new Error("Conversation not found");
      }
      const index = conversation.members.indexOf(memberId);
      if (index === -1) {
        throw new Error("Member not found in conversation");
      }
      conversation.members.splice(index, 1);
      await conversation.save();
      return conversation;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

const conversationService = new ConversationService();
export default conversationService;
