import express from "express";
import ConversationController from "../controllers/conversation.controllers.js";



const router = express.Router();

 router.post("/", ConversationController.create);
router.get("/:userId", ConversationController.getById);



export default router;