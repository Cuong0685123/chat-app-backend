import express from "express";
import { createConversation, getCoversationByUserId } from "../controllers/conversation.controllers.js";

const router = express.Router();

router.post("/", createConversation);
router.get("/:userId/user", getCoversationByUserId);



export default router;