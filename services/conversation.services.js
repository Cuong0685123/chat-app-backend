import Conversation from "../models/conversations.model.js";

class ConversationService{
    async getCoversationByUserId(req, res){
        const {userId} = req.parmas;
        const conversations = await Conversation.findById( userId).populate(
            "members"
        );
        if(!conversations){
            return {
                status: 404,
                message: "Conversation not found"
            }
        }
        return conversations;
    }
}

const conversationService = new ConversationService();
export default conversationService;