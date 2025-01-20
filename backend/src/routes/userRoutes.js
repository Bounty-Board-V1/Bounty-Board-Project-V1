const express = require("express");
const { User } = require("../models"); // Sequelize User model

// Middlewares
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

// Controller
const userController = require("../controllers/userController");
const router = express.Router();

// Get user profile
router.get("/profile", authMiddleware, userController.getUserProfile);
// Update user profile
router.put('/profile', upload.fields([
  { name: 'cv', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]),authMiddleware ,userController.updateUserProfile);


// Reset password
router.post("/reset-password", authMiddleware, userController.resetPassword);

module.exports = router;
