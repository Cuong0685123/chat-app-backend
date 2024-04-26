import Conversation from "../models/conversations.model.js";
export const createConversation = async (req, res) => {
  const { userIds } = req.body;
  console.log({ userIds });
  const conversation = await Conversation.create({
    members: userIds,
  });
  return res.status(201).json({ data: conversation });
};

export const getCoversationByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const conversations = await Conversation.find({ members: userId }).populate(
      "members"
    );
    console.log(userId);

    return res.status(200).json({ data: conversations });
  } catch (error) {
    return res
      .status(500)
      .json({
        error: "Error retrieving conversations",
        details: error.message,
      });
  }
};
