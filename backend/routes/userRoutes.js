import express from "express";
import {
  registerUser,
  loginUser,
  getPopularProfiles,
  getPublicProfile,
  updateProfileImage,
  getLoggedInUserProfile,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

// Public routes
router.post("/register", upload.single("profileImage"), registerUser);
router.post("/login", loginUser);
router.get("/profile/:username", getPublicProfile);

// Protected routes
router.get("/me", authMiddleware, getLoggedInUserProfile);
router.get("/popular-profiles", getPopularProfiles);
router.put(
  "/update-profile-image",
  authMiddleware,
  upload.single("profileImage"),
  updateProfileImage
);

export default router;
