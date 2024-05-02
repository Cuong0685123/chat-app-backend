import express from "express";
import ConversationController from "../controller/conversation.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, ConversationController.create);
router.get("/get-Conversation", authMiddleware, ConversationController.getById);
router.post("/add-members", ConversationController.add);
router.delete("/:conversationId/:memberId", ConversationController.delete);

export default router;
