import {Router} from "express";
import userController from "../controller/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/', authMiddleware, userController.getUserInfo);

export default router;