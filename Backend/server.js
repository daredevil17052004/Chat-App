import dotenv from 'dotenv';
dotenv.config(); 
import cors from 'cors'; 
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from './db/connectToMongoDB.js';
import { app, server } from './socket/socket.js';
dotenv.config({ path: path.resolve('./backend/.env') });
// const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(cors({
    origin: [
        "https://chat-app-gold-phi.vercel.app", // Your Vercel frontend URL
        "http://localhost:3000" // For local development
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"]
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,"frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`);
});