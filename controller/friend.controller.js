import friendService from "../service/friend.service.js";

class FriendController {
  async add(req, res) {
    try {
      const { senderId, receiverId } = req.body;
      const newFriendship = await friendService.addFriend(senderId, receiverId);

      res.status(201).json(newFriendship);
    } catch (error) {
      console.error("Error adding friend:", error);
      res.status(500).json({ error: "Error adding friend", details: error.message });
    }
  }
  async accept(req, res) {
    try {
      const { senderId, receiverId } = req.params;
      const result = await friendService.acceptInvitation(senderId, receiverId);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error accepting invitation:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }


async delete  (req, res) {
  try {
    const { senderId, receiverId } = req.params;
    const deletedInvitation = await friendService.deleteInvitation(senderId, receiverId);
    res.status(200).json({ message: 'Invitation deleted successfully', deletedInvitation });
  } catch (error) {
    console.error('Error deleting invitation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

}
const friendController = new FriendController();
export default friendController;
