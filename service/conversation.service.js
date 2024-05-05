import Conversation from "../model/conversation.model.js";
import User from "../model/user.model.js";

class ConversationService {
  async getConversationByUserId(userId) {
    try {
      const arrayCondition = [userId];
      const conversations = await Conversation.find({
        members: { $in: arrayCondition },
      }).populate("members")
      .populate("messages");
      conversations.messages = conversations?.messages?.slice(-1) ?? [];
      return conversations;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createConversation(conversation) {
    try {
      const invalidUserIds = await this.checkValidateUserIds(
        conversation.members
      );
      if (invalidUserIds.length > 0) {
        throw new Error(`UserId not in database`);
      }
      const newConversation = await Conversation.create(conversation);
      return newConversation;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async checkValidateUserIds(userIds) {
    try {
      const invalidUserIds = [];
      for (const userId of userIds) {
        if (typeof userId !== "string") {
          throw new Error("userId must be a string");
        }

        const user = await User.findById(userId);
        if (!user) {
          invalidUserIds.push(userId);
        }
      }
      return invalidUserIds;
    } catch (error) {
      throw new Error(`UserId not in database`);
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
