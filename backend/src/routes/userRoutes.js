const express = require("express");
// Middlewares
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

// Controller
const {
  CreateUserProfile,
  getUserProfile,
  updateUserProfile,
  resetPassword,
} = require("../controllers/userController");
const router = express.Router();

router.post("/register", CreateUserProfile);

// Get user profile
router.get("/profile", authMiddleware, getUserProfile);
// Update user profile
router.put(
  "/profile",
  upload.fields([
    { name: "cv", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  authMiddleware,
  updateUserProfile
);

// Reset password
router.post("/reset-password", authMiddleware, resetPassword);

module.exports = router;
