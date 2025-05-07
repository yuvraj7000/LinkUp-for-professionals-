import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getSuggestedConnections, getPublicProfile, updateProfile,searchUsers, getMessageRelatedUsers, getConversationMessages } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/suggestions",protectRoute, getSuggestedConnections);
router.get("/search", searchUsers);
router.put("/profile",protectRoute, updateProfile);
router.get("/:username", getPublicProfile);
router.get("/userMessages/:userId", getMessageRelatedUsers);
router.post("/conversationMessages", getConversationMessages);






export default router;
