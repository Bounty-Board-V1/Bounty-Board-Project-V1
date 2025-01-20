const express = require("express");
const router = express.Router();
const {
  createReward,
  getAllRewards,
  getRewardById,
  updateReward,
  deleteReward,
} = require("../controllers/rewardController");
const authMiddleware = require("../middlewares/authMiddleware");

// Routes for Rewards
router.post("/", authMiddleware,createReward); // Create a new reward
router.get("/",authMiddleware, getAllRewards); // Get all rewards
router.get("/:id", authMiddleware,getRewardById); // Get a reward by ID
router.put("/:id", authMiddleware,updateReward); // Update a reward
router.delete("/:id", authMiddleware,deleteReward); // Delete a reward

module.exports = router;
