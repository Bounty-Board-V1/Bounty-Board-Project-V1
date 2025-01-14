const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, projectController.getAllProjects);
router.get("/:id", authMiddleware, projectController.getProject);
router.post("/create", authMiddleware, projectController.createProject);
router.put("/:id", authMiddleware, projectController.updateProject);
router.delete("/:id", authMiddleware, projectController.deleteProject);

module.exports = router;
