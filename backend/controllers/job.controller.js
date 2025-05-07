import Job from "../models/job.model.js";

// Create a new job posting
export const createJob = async (req, res) => {
    try {
        const { title, company, location, salary, description, requirements } = req.body;
        const newJob = new Job({
            title,
            company,
            location,
            salary,
            description,
            requirements,
            postedBy: req.user._id,
        });
        const savedJob = await newJob.save();
        res.status(201).json(savedJob);
    } catch (error) {
        console.error("Error creating job:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all job postings (latest first)
export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find()
            .populate("postedBy", "name username profilePicture")
            .sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get a single job posting by ID
export const getJobById = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findById(id)
            .populate("postedBy", "name username profilePicture")
            .populate("applicants", "name username profilePicture");
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json(job);
    } catch (error) {
        console.error("Error fetching job:", error);
        res.status(500).json({ message: "Server error" });
    }
};



export const getJobsByRequirement = async (req, res) => {
    try {
        // Expect a query parameter such as ?requirements=React,JavaScript
        const { requirements } = req.query;
        if (!requirements) {
            return res.status(400).json({ message: "Requirements query parameter is required" });
        }
        // Convert the comma-separated string into an array of trimmed strings
        const reqArray = requirements.split(',').map(item => item.trim()).filter(Boolean);
        // Find jobs that have at least one matching requirement
        const jobs = await Job.find({ requirements: { $in: reqArray } })
            .populate("postedBy", "name username profilePicture")
            .sort({ createdAt: -1 });
        
        res.status(200).json(jobs);
    } catch (error) {
        console.error("Error fetching jobs by requirements:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update a job posting (only allowed for the owner)
export const updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        // Ensure the logged-in user is the owner
        if (String(job.postedBy) !== String(req.user._id)) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        const { title, company, location, salary, description, requirements } = req.body;
        job.title = title || job.title;
        job.company = company || job.company;
        job.location = location || job.location;
        job.salary = salary || job.salary;
        job.description = description || job.description;
        job.requirements = requirements || job.requirements;
        const updatedJob = await job.save();
        res.status(200).json(updatedJob);
    } catch (error) {
        console.error("Error updating job:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete a job posting (only allowed for the owner)
export const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        if (String(job.postedBy) !== String(req.user._id)) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        // Use deleteOne() instead of remove()
        await job.deleteOne();
        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        console.error("Error deleting job:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Apply for a job posting
export const applyJob = async (req, res) => {
    try {
        const { id } = req.params;  // Job ID
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        // Prevent duplicate applications
        if (job.applicants.includes(req.user._id)) {
            return res.status(400).json({ message: "Already applied for this job" });
        }
        job.applicants.push(req.user._id);
        await job.save();
        res.status(200).json({ message: "Application submitted successfully", job });
    } catch (error) {
        console.error("Error applying for job:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getJobsByPoster = async (req, res) => {
    try {
        const { posterId } = req.params;  // Expect URL parameter "posterId"
        console.log("Poster ID:", posterId);
        const jobs = await Job.find({ postedBy: posterId })
            .populate("postedBy", "name username profilePicture")
            .sort({ createdAt: -1 });
        
        res.status(200).json(jobs);
    } catch (error) {
        console.error("Error fetching jobs by poster:", error);
        res.status(500).json({ message: "Server error" });
    }
};