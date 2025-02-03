const express = require("express");
const router = express.Router();
const {
  getAllNotifications,
  getNotification,
  createNotification,
  updateNotification,
  deleteNotification,
} = require("../controllers/notificationController"); // Ensure the correct path
const authMiddleware = require("../middlewares/authMiddleware");

// Routes for Notifications
router.get("/", authMiddleware,getAllNotifications); // Get all notifications for the authenticated user
router.get("/:id",authMiddleware, getNotification); // Get a single notification by ID
router.post("/",authMiddleware, createNotification); // Create a new notification
router.put("/:id",authMiddleware, updateNotification); // Update a notification (e.g., mark as read)
router.delete("/:id",authMiddleware, deleteNotification); // Delete a notification by ID

module.exports = router;
