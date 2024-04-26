import express from "express";
import { login, logout, signup } from "../controllers/auth.controllers.js";
// import multer from 'multer';
// import {  storage } from '../s3.config.js'; 

const router = express.Router();
// const upload = multer({ storage });

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);


export default router;