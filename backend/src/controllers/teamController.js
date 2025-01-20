const { Team, Project, Request } = require("../models");

// Create a new team
const createTeam = async (req, res) => {
  try {
    const { name, members } = req.body;

    if (!name || !Array.isArray(members) || members.length < 1) {
      return res
        .status(400)
        .json({ error: "Team must have a name and at least one member" });
    }

    const newTeam = await Team.create({ name, members });
    res.status(201).json({ team: newTeam, message: "Team created successfully!" });
  } catch (error) {
    console.error("Error creating team:", error);
    res.status(500).json({ error: "Failed to create team" });
  }
};

// Get all teams
const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.findAll({ where: { isDeleted: 0 } });
    res.status(200).json({ teams });
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ error: "Failed to retrieve teams" });
  }
};

// Get a team by ID
const getTeamById = async (req, res) => {
  try {
    const { id } = req.params;

    const team = await Team.findByPk(id, { where: { isDeleted: 0 } });
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    res.status(200).json({ team });
  } catch (error) {
    console.error("Error fetching team:", error);
    res.status(500).json({ error: "Failed to retrieve team" });
  }
};

// Update a team
const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, members } = req.body;

    const team = await Team.findByPk(id);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    team.name = name || team.name;
    team.members = Array.isArray(members) ? members : team.members;

    await team.save();

    res.status(200).json({ team, message: "Team updated successfully!" });
  } catch (error) {
    console.error("Error updating team:", error);
    res.status(500).json({ error: "Failed to update team" });
  }
};

// Delete a team
const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const team = await Team.findByPk(id);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    team.isDeleted = 1;
    await team.save();

    res.status(200).json({ message: "Team deleted successfully!" });
  } catch (error) {
    console.error("Error deleting team:", error);
    res.status(500).json({ error: "Failed to delete team" });
  }
};

module.exports = {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
};
