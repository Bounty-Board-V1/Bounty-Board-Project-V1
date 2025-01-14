const { Project } = require("../models");

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

// Get a single project by ID
const getProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
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
    const posterId = req.user.id; // Assuming the token middleware adds the user ID to req.user
    const newProject = await Project.create({ ...req.body, posterId });
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: "Failed to create the project" });
  }
};

// Update a project by ID
const updateProject = async (req, res) => {
  try {
    const [updated] = await Project.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json({ message: "Project updated successfully" });
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

module.exports = {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
