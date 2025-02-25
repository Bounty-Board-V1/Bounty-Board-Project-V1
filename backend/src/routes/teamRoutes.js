const express = require("express");
const router = express.Router();
const {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  approveTeamRequest,
  getTeamsByCreator,
  removeMemberFromTeam
} = require("../controllers/teamController");
const authMiddleware = require("../middlewares/authMiddleware");

// Routes for Teams
router.post("/", authMiddleware,createTeam);
router.get("/", authMiddleware,getAllTeams);
router.get("/my-teams", authMiddleware,getTeamsByCreator);
router.get("/:id", authMiddleware,getTeamById);
router.put("/:id", authMiddleware,updateTeam);
router.delete("/:id",authMiddleware, deleteTeam);
router.post("/add-members/:id",authMiddleware, approveTeamRequest);
router.delete("/removeMember/:userId", authMiddleware,removeMemberFromTeam);

module.exports = router;
