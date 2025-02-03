const express = require("express");
const router = express.Router();
const {
    getAllProjects,
getProject,
createProject,
updateProject,
deleteProject
} = require("../controllers/projectController");
const authMiddleware = require("../middlewares/authMiddleware");

// Get all projects
router.get("/", authMiddleware, getAllProjects);

// Get a single project by ID
router.get("/:id", authMiddleware, getProject);

// Create a new project
router.post("/create", authMiddleware, createProject);

// Update a project by ID
router.put("/:id", authMiddleware, updateProject);

// Delete a project by ID
router.delete("/:id", authMiddleware,deleteProject);

// Additional routes can be added for project-specific actions like assigning teams, etc.

module.exports = router;
