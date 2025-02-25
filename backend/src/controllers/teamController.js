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
    if (!request) {
      return res.status(404).json({ error: "Request not found or already handled" });
    }

    // Ensure the request is for the authenticated user
    if (request.receiverId !== userId) {
      return res.status(403).json({ error: "Unauthorized: You cannot approve this request" });
    }

    // Assign the user to the team
    await User.update({ teamId: request.teamId }, { where: { id: userId } });

    // **Check if the request can be deleted before attempting to destroy**
    console.log("Deleting request with ID:", requestId);

    // Try deleting the request
    const deleteResult = await Request.destroy({ where: { id: requestId } });

    if (deleteResult === 0) {
      console.warn("Request was not deleted, possibly due to constraints.");
      return res.status(500).json({ error: "Failed to delete request after approval." });
    }

    res.status(200).json({ message: "User successfully added to the team and request deleted!" });
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
const removeMemberFromTeam = async (req, res) => {
  try {
    const { userId } = req.params; // Get the user ID from the request parameters
    const { teamId } = req.body; // Get the team ID from the request body

    // Check if the team exists
    const team = await Team.findOne({
      where: { id: teamId },
    });

    if (!team) {
      return res.status(404).json({ message: "Team not found." });
    }

    // Check if the user exists and is part of the team
    const user = await User.findOne({
      where: { id: userId, teamId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found or not a member of this team." });
    }

    // Remove the user from the team by setting their teamId to null
    await user.update({ teamId: null });

    res.status(200).json({ message: "User removed from the team successfully." });
  } catch (error) {
    console.error("Error removing user from team:", error);
    res.status(500).json({ error: "Failed to remove user from team." });
  }
};

module.exports = {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  approveTeamRequest,
  getTeamsByCreator,
  removeMemberFromTeam
};
