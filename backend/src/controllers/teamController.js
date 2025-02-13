const { Team, Project, Request, User } = require("../models");

// Create a new team
const createTeam = async (req, res) => {
  try {
    const { name } = req.body;
    const createrId = req.user.id; // Extract user ID from token

    if (!name) {
      return res.status(400).json({ error: "Team must have a name" });
    }

    // Create new team with creatorId
    const newTeam = await Team.create({ name, createrId });

    res.status(201).json({ team: newTeam, message: "Team created successfully!" });
  } catch (error) {
    console.error("Error creating team:", error);
    res.status(500).json({ error: "Failed to create team" });
  }
};

const getTeamsByCreator = async (req, res) => {
  try {
    const createrId = req.user.id;

    // Fetch all teams created by this user, including team members
    const teams = await Team.findAll({
      where: { createrId }, // Make sure 'creatorId' is the correct column name
      include: [
        {
          model: User,
          as: 'creater',
          attributes: ['id', 'email', 'name'],
        },
        {
          model: User,
          as: 'members',
          attributes: ['id', 'email', 'name'],
        },
      ],
    });

    if (!teams.length) {
      return res.status(404).json({ message: "No teams found for this user." });
    }

    const formattedTeams = teams.map(team => ({
      id: team.id,
      name: team.name,
      creater: team.creater,
      members: team.members,
    }));

    res.status(200).json({ teams: formattedTeams });
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ error: "Failed to fetch teams" });
  }
};


// Add members to a team using their emails
const approveTeamRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const userId = req.user.id; // Extract user ID from token

    if (!requestId) {
      return res.status(400).json({ error: "Invalid request ID" });
    }

    // Find the request by ID
    const request = await Request.findByPk(requestId);
    if (!request || request.isDeleted) {
      return res.status(404).json({ error: "Request not found or already handled" });
    }

    // Ensure the request is for the authenticated user
    if (request.receiverId !== userId) {
      return res.status(403).json({ error: "Unauthorized: You cannot approve this request" });
    }

    // Assign the user to the team
    await User.update({ teamId: request.teamId }, { where: { id: userId } });

    // Soft delete the request (mark as handled)
    await request.update({ isDeleted: true });

    res.status(200).json({ message: "User successfully added to the team!" });
  } catch (error) {
    console.error("Error approving request:", error);
    res.status(500).json({ error: "Failed to approve request" });
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
  approveTeamRequest,
  getTeamsByCreator
};
