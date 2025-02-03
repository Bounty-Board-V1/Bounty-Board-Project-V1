const express = require("express");
const { User } = require("../models"); // Sequelize User model

// Middlewares
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

// Controller
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/register", userController.CreateUserProfile);

// Get user profile
router.get("/profile", authMiddleware, userController.getUserProfile);

// Complete user profile with image and CV upload
router.post(
  "/complete-profile",
  authMiddleware,
  upload.fields([{ name: "image" }, { name: "cv" }]),
  userController.completeUserProfile
);

// Update user profile
router.put(
  "/profile",
  authMiddleware,
  upload.fields([{ name: "image" }, { name: "cv" }]),
  userController.updateUserProfile
);

// Reset password
router.post("/reset-password", authMiddleware, userController.resetPassword);

module.exports = router;
