import express from "express";
import friendController from "../controllers/friend.controllers.js";



const router = express.Router();

router.post("/", friendController.add);
router.put('/:senderId/:receiverId', friendController.accept);
router.delete('/:senderId/:receiverId', friendController.delete);




export default router;