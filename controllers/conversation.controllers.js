import ConversationService from "../services/conversation.services.js";


// export const createConversation = async (req, res) => {
//     const { userIds } = req.body;
//     console.log({ userIds });
//     const conversation = await Conversation.create({
//       members: userIds,
//     });
//     return res.status(201).json({ data: conversation });
//   };


class ConversationController {

    // async create
    


  async getById(req, res) {
    try {
        const {userId} = req.params;
      const conversation = await ConversationService.findById(userId);
      return res.status(200).json({ data: conversation });
    } catch (err) {
        return res.status(404).json({message: "cant not find"});
    }
  }

}
const conversationController = new ConversationController();
export default conversationController;
