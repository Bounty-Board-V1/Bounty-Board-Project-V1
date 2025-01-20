const { Notification, Request, Project, User, Team } = require("../models");

// Get all notifications for the authenticated user
const getAllNotifications = async (req, res) => {
  try {
    const userId = req.user.id;

    const notifications = await Notification.findAll({
      where: { userId },
      include: [
        {
          model: Request,
          attributes: ["id", "name"], // Include the request name and ID
        },
        {
          model: Project,
          attributes: ["id", "name"], // Include the project name and ID
        },
      ],
      order: [["createdAt", "DESC"]], // Sort by the most recent notifications
    });

    if (!notifications.length) {
      return res.status(404).json({ message: "No notifications found." });
    }

    res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to retrieve notifications." });
  }
};

// Get a single notification by ID
const getNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByPk(id, {
      include: [
        {
          model: Request,
          attributes: ["id", "name"], // Include the request name and ID
        },
        {
          model: Project,
          attributes: ["id", "name"], // Include the project name and ID
        },
      ],
    });

    if (!notification) {
      return res.status(404).json({ message: "Notification not found." });
    }

    res.status(200).json({ notification });
  } catch (error) {
    console.error("Error fetching notification:", error);
    res.status(500).json({ error: "Failed to retrieve notification." });
  }
};

// Create a new notification
const createNotification = async (req, res) => {
  try {
    const { type, userId, requestId, projectId, message } = req.body;

    // Validate input
    if (!type || !userId || !message) {
      return res.status(400).json({ error: "Type, userId, and message are required." });
    }

    // Check if the type is relevant (new request, approval, rejection)
    const validTypes = ["new_request", "request_approved", "request_rejected"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: "Invalid notification type." });
    }

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Check if project and request exist if relevant
    if (type === "new_request" || type === "request_approved" || type === "request_rejected") {
      const request = await Request.findByPk(requestId);
      if (!request) {
        return res.status(404).json({ error: "Request not found." });
      }

      const project = await Project.findByPk(projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found." });
      }
    }

    // Create the notification
    const newNotification = await Notification.create({
      type,
      userId,
      requestId,
      projectId,
      message,
    });

    res.status(201).json(newNotification);
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ error: "Failed to create notification." });
  }
};

// Update a notification (e.g., mark as read)
const updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { isRead } = req.body;

    const notification = await Notification.findByPk(id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found." });
    }

    notification.isRead = isRead ?? notification.isRead;
    await notification.save();

    res.status(200).json({ message: "Notification updated successfully.", notification });
  } catch (error) {
    console.error("Error updating notification:", error);
    res.status(500).json({ error: "Failed to update notification." });
  }
};

// Delete a notification
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByPk(id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found." });
    }

    await notification.destroy();
    res.status(200).json({ message: "Notification deleted successfully." });
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({ error: "Failed to delete notification." });
  }
};

module.exports = {
  getAllNotifications,
  getNotification,
  createNotification,
  updateNotification,
  deleteNotification,
};
