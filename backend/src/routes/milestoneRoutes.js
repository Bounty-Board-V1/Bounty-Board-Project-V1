const express = require("express");
const router = express.Router();
const {getAllMilestones,
    getMilestone,
    createMilestone,
    updateMilestone,
    deleteMilestone
    
} = require("../controllers/milestoneController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/project/:projectId", authMiddleware, getAllMilestones);
router.get("/:id", authMiddleware, getMilestone);
router.post("/create", authMiddleware, createMilestone);
router.put("/:id", authMiddleware, updateMilestone);
router.delete("/:id", authMiddleware,deleteMilestone);

module.exports = router;
