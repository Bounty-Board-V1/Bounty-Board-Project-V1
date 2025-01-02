const express = require("express");
const { User } = require("../models"); // Sequelize User model

// Middlewares
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

// Controller
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/profile", authMiddleware, userController.getUserProfile);

router.post(
  "/complete-profile",
  authMiddleware,
  upload.fields([{ name: "image" }, { name: "cv" }]),
  userController.completeUserProfile
);

// Add the new route for updating user profile
router.put(
  "/profile",
  authMiddleware,
  upload.fields([{ name: "image" }, { name: "cv" }]),
  userController.updateUserProfile
);

module.exports = router;

