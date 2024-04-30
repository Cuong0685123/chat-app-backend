import express from "express";
import friendController from "../controllers/friend.controllers.js";



const router = express.Router();

router.post("/", friendController.add);
router.put('/:senderId/:receiverId', friendController.accept);




export default router;