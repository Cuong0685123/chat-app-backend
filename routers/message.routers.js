import express from "express";
import {  storage } from '../s3.config.js'; 
import multer from "multer";
import messageController from "../controllers/message.controllers.js";



const router = express.Router();
const upload = multer({ storage });

router.post("/sendMessage",upload.array("files"), messageController.send);
router.delete("/:messageId", messageController.revoked);
// router.get("/:conversationId/conversation", getAllMessages);





export default router;