import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from 'node:http';

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";
import connectionRoutes from "./routes/connection.route.js";
import jobRoutes from "./routes/job.route.js";
import messagesModel from "./models/messages.model.js";

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const server = createServer(app); // Create HTTP server
const io = new Server(server, {
    cors: {
        origin: "*", // Allow frontend origin
        credentials: true,
    },
});

const socketToUserMap = {}; // Map to track socket IDs to user IDs

// WebSocket connection handling
io.on("connection", (socket) => {
    console.log("New client connected", socket.id);
    
    // Register the user with their socket ID
    socket.on("register", (userId) => {
        socketToUserMap[userId] = socket.id; // Map user ID to socket ID
        console.log(`User ${userId} registered with socket ID ${socket.id}`);
    });
   

      // Listen for 'message' event from clients and send only to receiver
      socket.on("message", async (data) => {
        const { message, senderId, reciverId } = data;
        try {
            // Save message data to database
            const savedMessage = await messagesModel.create({
                senderId,
                receiverId: reciverId,
                message
            });
            // Get receiver's socket ID from socketToUserMap
            const receiverSocketId = socketToUserMap[reciverId];
            io.to( socketToUserMap[senderId]).emit("message", { 
                message, 
                senderId, 
                reciverId,
                timestamp: savedMessage.timestamp
            });
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("message", { 
                    message, 
                    senderId, 
                    reciverId,
                    timestamp: savedMessage.timestamp
                });
            }
            else{
                console.log(`Receiver ${reciverId} is not connected`);
            }
        } catch (error) {
            console.error("Error saving message:", error);
        }
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
    });
});

// Middleware
app.use(cors({
    origin: "*",
    credentials: true,
}));
app.use(express.json({ limit: "5mb" })); // Parse JSON request bodies
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/connections", connectionRoutes);
app.use("/api/v1/jobs", jobRoutes);

// Start server correctly
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});
