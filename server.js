import express from 'express'; 
import connectToMongoDB from "./db/connectToMongoDB.js";
import dotenv from 'dotenv'; 
import authRouter from './routers/auth.routers.js';
import conversationRouter from './routers/conversation.routers.js';
import messageRouter from './routers/message.routers.js';
const PORT = process.env.PORT || 3000;

dotenv.config();
await connectToMongoDB();

const app = express();
app.use(express.json());

app.use("/api/messages",messageRouter),
app.use("/api/conversations", conversationRouter),
app.use("/api/auth", authRouter),




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});