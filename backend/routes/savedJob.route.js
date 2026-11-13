import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { toggleSaveJob, getSavedJobs, checkSavedStatus } from "../controllers/savedJob.controller.js";

const router = express.Router();

router.route("/save/:id").post(isAuthenticated, toggleSaveJob);
router.route("/saved").get(isAuthenticated, getSavedJobs);
router.route("/check").get(isAuthenticated, checkSavedStatus);

export default router;
