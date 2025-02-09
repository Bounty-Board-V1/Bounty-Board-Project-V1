const express = require("express");
// Middlewares
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

// Controller
const {createUserProfile,
  getUserProfile,
  updateUserProfile,
  resetPassword,
} = require("../controllers/userController");
const router = express.Router();

router.post("/register", createUserProfile);

// Get user profile
router.get("/profile", authMiddleware, getUserProfile);
// Update user profile
router.put(
  "/profile",
  upload.fields([
    { name: "CV", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  authMiddleware,
  updateUserProfile
);

// Reset password
router.post("/reset-password", authMiddleware, resetPassword);

module.exports = router;
