import express from "express";
import ConversationController from "../controllers/conversation.controllers.js";
import authMiddleware from "../middeware/auth.authen.js";



const router = express.Router();

 router.post("/",authMiddleware, ConversationController.create);
router.get("/:userId",authMiddleware, ConversationController.getById);



export default router;