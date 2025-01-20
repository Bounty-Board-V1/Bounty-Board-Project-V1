const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const authMiddleware = require("../middlewares/authMiddleware");

// Get all projects
router.get("/", authMiddleware, projectController.getAllProjects);

// Get a single project by ID
router.get("/:id", authMiddleware, projectController.getProject);

// Create a new project
router.post("/create", authMiddleware, projectController.createProject);

// Update a project by ID
router.put("/:id", authMiddleware, projectController.updateProject);

// Delete a project by ID
router.delete("/:id", authMiddleware, projectController.deleteProject);

// Additional routes can be added for project-specific actions like assigning teams, etc.

module.exports = router;
