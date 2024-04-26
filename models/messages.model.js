import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    text: {
      type: String,
    },
    images: {
      type: [String],
    },
    files: {
      type: [String],
    },
    recallAt: {
      type: Date,
    },
    deleteAt: {
      type: Date,
    },
    createdAt: {
      type: Date,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
const Message = mongoose.model("Message", messageSchema);

export default Message;
