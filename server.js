import express from 'express'; 
import connectToMongoDB from "./db/connectToMongoDB.js";
import dotenv from 'dotenv'; 
import authRouter from './router/auth.router.js';
import conversationRouter from './router/conversation.router.js';
import messageRouter from './router/message.router.js';
import friendRouter from './router/friend.router.js';
import cors from 'cors'
const PORT = process.env.PORT || 3000;

dotenv.config();
await connectToMongoDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/messages",messageRouter),
app.use("/api/conversations", conversationRouter),
app.use("/api/auth", authRouter),
app.use("/api/friends", friendRouter),




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});