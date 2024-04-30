import Friend from "../models/friends.model"

class FriendServices {
   async  addFriend  (senderId, receiverId) {
        try {
          const existingFriendship = await Friend.findOne({ senderId, receiverId });
          if (existingFriendship) {
            throw new Error("Friendship already exists");
          }
          const newFriendship = new Friend({
            senderId,
            receiverId,
            status: "pending",
          });
          const savedFriendship = await newFriendship.save();
      
          return savedFriendship;
        } catch (error) {
          throw new Error(error.message);
        }
      };
}

const friendService = new FriendServices();
export default friendService;
