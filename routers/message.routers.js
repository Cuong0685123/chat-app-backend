import express from "express";
import {  storage } from '../s3.config.js'; 
import { getAllMessages, revokedMessage, sendMessage } from "../controllers/message.controllers.js";
import multer from "multer";



const router = express.Router();
const upload = multer({ storage });

router.post("/sendMessage",upload.array("files"), sendMessage);
router.delete("/:senderId/message", revokedMessage);
router.get("/:conversationId/conversation", getAllMessages);





export default router;