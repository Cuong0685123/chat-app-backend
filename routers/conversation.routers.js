import express from "express";
import ConversationController from "../controllers/conversation.controllers.js";



const router = express.Router();

// router.post("/", createConversation);
router.get("/:userId", ConversationController.getById);



export default router;