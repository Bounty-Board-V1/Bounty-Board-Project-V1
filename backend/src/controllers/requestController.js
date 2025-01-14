const { Request, Project } = require("../models");

// Create a new request
const createRequest = async (req, res) => {
  try {
    const { name, userId, projectId } = req.body;

    // Ensure the project exists before creating a request
    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const newRequest = await Request.create({ name, userId, projectId });
    res.status(201).json(newRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create the request" });
  }
};

// Approve a request
const approveRequest = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the request
    const request = await Request.findByPk(id);
    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    // Update the project's status to "in-progress" or similar
    const project = await Project.findByPk(request.projectId);
    if (project) {
      project.status = "in-progress";
      await project.save();
    }

    res.status(200).json({ message: "Request approved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to approve the request" });
  }
};

// Reject a request
const rejectRequest = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the request
    const request = await Request.findByPk(id);
    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    // Optionally, perform actions like notifying the user
    res.status(200).json({ message: "Request rejected successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to reject the request" });
  }
};

module.exports = {
  createRequest,
  approveRequest,
  rejectRequest,
};
