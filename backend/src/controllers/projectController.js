const { Project, Team, User } = require("../models");

// Get all projects
const getAllProjectsOfPoster = async (req, res) => {
  try {
    const posterId = req.user.id; // Extract posterId from authenticated user
    const projects = await Project.findAll({ where: { posterId } });

    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: {
        model: User, // The related model
        as: 'poster', // The alias for the association
        attributes: ['name'], // Only select the 'name' field (posterName)
      },
    });

    // Map over projects to replace the posterId with posterName
    const projectsWithPosterName = projects.map((project) => ({
      ...project.toJSON(),
      posterName: project.poster ? project.poster.name : "None", // Use alias here to access posterName
    }));

    // Respond with the modified projects
    res.status(200).json(projectsWithPosterName);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};


// Get a single project by ID
const getProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: [
        {
          model: Team,
          as: "team", // Assumed association with Team
          attributes: ["id", "name"], // Include team details
        },
        {
          model: Reward,
          attributes: ["amount", "currency"], // Include reward details
        },
      ],
    });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the project" });
  }
};

// Create a new project
const createProject = async (req, res) => {
  try {
    console.log(req.body);

    const {
      title,
      description,
      rewardAmount,
      techStack,
      status,
      estimatedTime,
      timeline,
    } = req.body;
    const posterId = req.user.id; // Assuming the token middleware adds the user ID to req.user

    const newProject = await Project.create({
      title,
      description,
      posterId,
      rewardAmount,
      techStack,
      status,
      estimatedTime,
      timeline,
    });

    res
      .status(201)
      .json({ project: newProject, message: "Project created successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create the project" });
  }
};

// Update a project by ID
const updateProject = async (req, res) => {
  try {
    const {
      title,
      description,
      rewardAmount,
      techStack,
      estimatedTime,
      timeline,
    } = req.body;

    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Validate team assignment
    const team = await Team.findByPk(teamId);
    if (team.isDeleted) {
      return res.status(404).json({ error: "Assigned team is deleted" });
    }

    project.title = title || project.title;
    project.description = description || project.description;
    project.teamId = teamId || project.teamId;
    project.rewardAmount = rewardAmount || project.rewardAmount;
    project.techStack = techStack || project.techStack;
    project.estimatedTime = estimatedTime || project.estimatedTime;
    project.timeline = timeline || project.timeline;

    await project.save();

    res.status(200).json({ message: "Project updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update the project" });
  }
};

// Delete a project by ID
const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the project" });
  }
};

// Approve a project (Set project status to in-progress and create reward if applicable)
const approveProject = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the project by ID
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Ensure the project has an assigned team
    const team = await Team.findByPk(project.teamId);
    if (!team || team.isDeleted) {
      return res
        .status(400)
        .json({ error: "Project is not assigned to a valid team" });
    }

    // Update project status to "in-progress"
    project.status = "in-progress";
    await project.save();

    // Create a reward if applicable
    if (project.rewardAmount) {
      await Reward.create({
        amount: project.rewardAmount,
        currency: "USD", // You can modify this if needed
      });
    }

    res.status(200).json({ message: "Project approved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to approve the project" });
  }
};

module.exports = {
  getAllProjectsOfPoster,
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  approveProject,
};
