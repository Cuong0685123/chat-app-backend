import Conversation from "../model/conversation.model.js";
import User from "../model/user.model.js";
import mongoose from "mongoose";
import Message from "../model/message.model.js";

class ConversationService {
  async getConversationByUserId(userId) {
    try {
      const arrayCondition = [userId];
      const conversations = await Conversation.find({
        members: { $in: arrayCondition },
      })
        .populate("members")
        .populate("lastMessage");
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
      const allUserIdsValid = invalidUserIds.every((userId) => !userId);
      if (!allUserIdsValid) {
        throw new Error("One or more user IDs are invalid");
      }
      const newConversation = await Conversation.create(conversation);
      return newConversation;
    } catch (error) {
      throw new Error(`Failed to create conversation: ${error.message}`);
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
      const hasInvalidUserId = invalidUserIds.some((userId) => !!userId);
      if (hasInvalidUserId) {
        throw new Error("One or more user IDs are invalid");
      }
      return invalidUserIds;
    } catch (error) {
      throw new Error(`UserId not in database: ${error.message}`);
    }
  }

  async updateConversation(conversationId, memberId) {
    try {
      if (!Array.isArray(memberId)) {
        throw new Error("memberIds");
      }

      const objectIdMembers = memberId.map((id) => {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          throw new Error(`Invalid ObjectId: ${id}`);
        }
        return new mongoose.Types.ObjectId(id);
      });

      const conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        throw new Error("Conversation not found");
      }

      conversation.members.push(...objectIdMembers);

      conversation.members = [
        ...new Set(conversation.members.map((member) => member.toString())),
      ].map((id) => new mongoose.Types.ObjectId(id));

      await conversation.save();

      return conversation;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteMembers(conversationId, memberIds) {
    try {
      const conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        throw new Error("Conversation not found");
      }
      memberIds.forEach(memberId => {
        const index = conversation.members.indexOf(memberId);
        if (index !== -1) {
          conversation.members.splice(index, 1);
        }
      });
      await conversation.save();
      return conversation;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  

  async findFilesInConversation(conversationId) {
    try {
      const messages = await Message.find({ conversationId });
      const files = messages.reduce((acc, message) => {
        if (message.files && message.files.length > 0) {
          acc.push(...message.files);
        }
        return acc;
      }, []);
      return files;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

const conversationService = new ConversationService();
export default conversationService;
