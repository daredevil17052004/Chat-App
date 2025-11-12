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

// CORS Configuration - MUST be before other middleware
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            'https://chat-app-gold-phi.vercel.app',
            'http://localhost:3000',
            'http://localhost:5173'
        ];
        
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    console.log('Cookies:', req.cookies);
    next();
});

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