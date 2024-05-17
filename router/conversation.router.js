import express from "express";
import ConversationController from "../controller/conversation.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware,ConversationController.create);
router.get("/",authMiddleware, ConversationController.getById);
router.put("/:conversationId/members",authMiddleware, ConversationController.update);
router.delete("/",authMiddleware, ConversationController.delete);
router.get("/:conversationId/files", ConversationController.findFilesInConversation);

export default router;
