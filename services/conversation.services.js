import Conversation from "../models/conversations.model.js";

class ConversationService {
  async getCoversationByUserId(userId) {
    try {

        const conversations = await Conversation.findById({
      members: userId,
    }).populate("members");
    return conversations;
    } catch (error) {
        return{
            status: 404,
            message: "cant not find"
        }
    }
  }
  async createConversation(conversation) {
    try {
        const newConversation = await Conversation.create(conversation);
        console.log(conversation)
        return newConversation;
    } catch (error) {
        return{
            status: 404,
            message: "cant not creat"
        }
    }
  }
}

const conversationService = new ConversationService();
export default conversationService;
