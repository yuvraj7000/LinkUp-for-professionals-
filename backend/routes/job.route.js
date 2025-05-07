import express from "express";
import {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob,
    applyJob,
    getJobsByPoster,
    getJobsByRequirement
} from "../controllers/job.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();


router.get("/search", protectRoute, getJobsByRequirement);

// Create a new job posting
router.post("/", protectRoute, createJob);

// Get all job postings (latest first)
router.get("/", protectRoute, getJobs);

// Get a specific job posting by ID
router.get("/:id", protectRoute, getJobById);

// Update a job posting (only allowed for the owner)
router.put("/:id", protectRoute, updateJob);

// Delete a job posting (only allowed for the owner)
router.delete("/:id", protectRoute, deleteJob);

// Apply for a job posting
router.post("/:id/apply", protectRoute, applyJob);


router.get("/poster/:posterId", protectRoute, getJobsByPoster);




export default router;