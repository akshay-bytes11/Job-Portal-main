import { SavedJob } from "../models/savedJob.model.js";

export const toggleSaveJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            });
        }

        const existingSave = await SavedJob.findOne({ user: userId, job: jobId });

        if (existingSave) {
            // Already saved — remove it (unsave)
            await SavedJob.findByIdAndDelete(existingSave._id);
            return res.status(200).json({
                message: "Job removed from saved jobs.",
                saved: false,
                success: true
            });
        }

        // Not saved yet — save it
        await SavedJob.create({ user: userId, job: jobId });
        return res.status(201).json({
            message: "Job saved successfully.",
            saved: true,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const getSavedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const savedJobs = await SavedJob.find({ user: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'job',
                populate: {
                    path: 'company'
                }
            });

        return res.status(200).json({
            savedJobs,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const checkSavedStatus = async (req, res) => {
    try {
        const userId = req.id;
        // Return all saved job IDs for this user (for quick frontend lookup)
        const savedJobs = await SavedJob.find({ user: userId }).select('job');
        const savedJobIds = savedJobs.map(s => s.job.toString());

        return res.status(200).json({
            savedJobIds,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};
