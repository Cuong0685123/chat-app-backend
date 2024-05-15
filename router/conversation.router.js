import express from "express";
import ConversationController from "../controller/conversation.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware,ConversationController.create);
router.get("/",authMiddleware, ConversationController.getById);
router.put("/:conversationId",authMiddleware, ConversationController.update);
router.delete("/",authMiddleware, ConversationController.delete);

export default router;
