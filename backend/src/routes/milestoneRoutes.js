const express = require("express");
const router = express.Router();
const milestoneController = require("../controllers/milestoneController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/project/:projectId", authMiddleware, milestoneController.getAllMilestones);
router.get("/:id", authMiddleware, milestoneController.getMilestone);
router.post("/create", authMiddleware, milestoneController.createMilestone);
router.put("/:id", authMiddleware, milestoneController.updateMilestone);
router.delete("/:id", authMiddleware, milestoneController.deleteMilestone);

module.exports = router;
