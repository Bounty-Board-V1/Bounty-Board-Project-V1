const express = require("express");
const { User } = require("../models"); // Sequelize User model

// Middlewares
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

// Controller
const {
  getUserProfile,
updateUserProfile,
resetPassword
} = require("../controllers/userController");
const router = express.Router();

// Get user profile
router.get("/profile", authMiddleware,getUserProfile);
// Update user profile
router.put('/profile', upload.fields([
  { name: 'cv', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]),authMiddleware ,updateUserProfile);


// Reset password
router.post("/reset-password", authMiddleware, resetPassword);

module.exports = router;
