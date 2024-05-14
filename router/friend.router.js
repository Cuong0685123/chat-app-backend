import express from "express";
import friendController from "../controller/friend.controller.js";



const router = express.Router();

router.post('/', friendController.add);
router.put('/', friendController.accept);
router.delete('/:friendId', friendController.delete);




export default router;