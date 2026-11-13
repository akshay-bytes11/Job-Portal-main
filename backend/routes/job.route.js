import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import isRecruiter from "../middlewares/isRecruiter.js";
import { getAdminJobs, getAllJobs, getJobById, postJob, updateJob, deleteJob, getRecruiterStats } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, isRecruiter, postJob);
router.route("/get").get(getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, isRecruiter, getAdminJobs);
router.route("/stats").get(isAuthenticated, isRecruiter, getRecruiterStats);
router.route("/get/:id").get(getJobById);
router.route("/update/:id").put(isAuthenticated, isRecruiter, updateJob);
router.route("/delete/:id").delete(isAuthenticated, isRecruiter, deleteJob);

export default router;

