import express from "express";
import { login, logout, register, updateProfile, getAllUsers, getUserById } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import isRecruiter from "../middlewares/isRecruiter.js";
import { singleUpload } from "../middlewares/mutler.js";
 
const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);
router.route("/all-users").get(isAuthenticated, isRecruiter, getAllUsers);
router.route("/:id").get(isAuthenticated, isRecruiter, getUserById);

export default router;

