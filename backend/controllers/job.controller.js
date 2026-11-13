import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";
import { SavedJob } from "../models/savedJob.model.js";

// admin post krega job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}
// student k liye
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const skip = (page - 1) * limit;

        let query = {};
        if (keyword) {
            const kw = keyword.toLowerCase();
            if (kw.includes("lpa") || kw.includes("lakh") || kw.includes("k")) {
                let minSalary = 0, maxSalary = Infinity;
                if (kw === "0-40k" || kw === "0-6 lpa" || kw === "0-6") { minSalary = 0; maxSalary = 6; }
                else if (kw === "42-1lakh" || kw === "6-12 lpa" || kw === "6-12") { minSalary = 6; maxSalary = 12; }
                else if (kw === "1lakh to 5lakh" || kw === "12-25 lpa" || kw === "12-25") { minSalary = 12; maxSalary = 25; }
                else if (kw === "25+ lpa" || kw === "25+") { minSalary = 25; maxSalary = 999; }

                query = {
                    $or: [
                        { title: { $regex: keyword, $options: "i" } },
                        { description: { $regex: keyword, $options: "i" } },
                        { location: { $regex: keyword, $options: "i" } },
                        { salary: { $gte: minSalary, $lte: maxSalary } }
                    ]
                };
            } else {
                query = {
                    $or: [
                        { title: { $regex: keyword, $options: "i" } },
                        { description: { $regex: keyword, $options: "i" } },
                        { location: { $regex: keyword, $options: "i" } },
                        { requirements: { $regex: keyword, $options: "i" } },
                    ]
                };
            }
        }
        const totalJobs = await Job.countDocuments(query);
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 }).skip(skip).limit(limit);

        return res.status(200).json({
            jobs,
            totalJobs,
            currentPage: page,
            totalPages: Math.ceil(totalJobs / limit),
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}
// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}
// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company'
        }).sort({createdAt:-1});
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

// update job
export const updateJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position } = req.body;
        const jobId = req.params.id;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found.", success: false });
        }

        // Verify ownership
        if (job.created_by.toString() !== req.id) {
            return res.status(403).json({ message: "You can only edit your own jobs.", success: false });
        }

        const updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (requirements) updateData.requirements = requirements.split(",");
        if (salary) updateData.salary = Number(salary);
        if (location) updateData.location = location;
        if (jobType) updateData.jobType = jobType;
        if (experience) updateData.experienceLevel = experience;
        if (position) updateData.position = position;

        const updatedJob = await Job.findByIdAndUpdate(jobId, updateData, { new: true });

        return res.status(200).json({
            message: "Job updated successfully.",
            job: updatedJob,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

// delete job
export const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found.", success: false });
        }

        // Verify ownership
        if (job.created_by.toString() !== req.id) {
            return res.status(403).json({ message: "You can only delete your own jobs.", success: false });
        }

        // Delete associated applications and saved jobs
        await Application.deleteMany({ job: jobId });
        await SavedJob.deleteMany({ job: jobId });
        await Job.findByIdAndDelete(jobId);

        return res.status(200).json({
            message: "Job deleted successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

// recruiter dashboard stats
export const getRecruiterStats = async (req, res) => {
    try {
        const adminId = req.id;

        // Get all jobs by this recruiter
        const jobs = await Job.find({ created_by: adminId });
        const jobIds = jobs.map(j => j._id);

        // Get all applications for these jobs
        const applications = await Application.find({ job: { $in: jobIds } })
            .populate({ path: 'applicant', select: 'fullname email phoneNumber profile' })
            .populate({ path: 'job', select: 'title company', populate: { path: 'company', select: 'name' } })
            .sort({ createdAt: -1 });

        const totalJobs = jobs.length;
        const totalApplicants = applications.length;
        const pending = applications.filter(a => a.status === 'pending').length;
        const accepted = applications.filter(a => a.status === 'accepted').length;
        const rejected = applications.filter(a => a.status === 'rejected').length;

        return res.status(200).json({
            stats: {
                totalJobs,
                totalApplicants,
                pending,
                accepted,
                rejected
            },
            recentApplications: applications.slice(0, 5),
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

