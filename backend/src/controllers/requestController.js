const { Request, Project, User, Team, Notification } = require("../models");

// Create a new request
const createRequest = async (req, res) => {
  try {
    const posterId = req.user.id; // Assuming req.user is set by authentication middleware
    const { name, projectId } = req.body;

    // Ensure the project exists before creating a request
    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Ensure the hunter has a valid team
    const hunterId = req.user.id; // Assuming req.user is set by authentication middleware
    const hunterTeam = await Team.findOne({ where: { members: { [Op.contains]: [hunterId] } } });
    if (!hunterTeam) {
      return res.status(400).json({ error: "Hunter must belong to a team to apply for a project" });
    }

    // Create the new request
    const newRequest = await Request.create({ name, posterId, projectId, hunterId });
    
    // Notify the poster about the new request
    await Notification.create({
      userId: posterId,
      message: `New request received for your project: ${project.title}`,
      type: 'new_request',
      referenceId: newRequest.id,
    });

    res.status(201).json(newRequest);
  } catch (error) {
    console.error("Error creating request:", error);
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

    // Ensure the project is in a valid state
    const project = await Project.findByPk(request.projectId);
    if (!project || project.status !== 'open') {
      return res.status(400).json({ error: "Project is not open for approval" });
    }

    // Update the project's status to "in-progress"
    project.status = "in-progress";
    await project.save();

    // Notify the hunter about the approval
    await Notification.create({
      userId: request.hunterId,
      message: `Your request for the project '${project.title}' has been approved.`,
      type: 'request_approved',
      referenceId: request.id,
    });

    // Notify the poster about the approval
    await Notification.create({
      userId: request.posterId,
      message: `The request for your project '${project.title}' has been approved.`,
      type: 'request_approved',
      referenceId: request.id,
    });

    res.status(200).json({ message: "Request approved successfully" });
  } catch (error) {
    console.error("Error approving request:", error);
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

    // Notify the hunter about the rejection
    await Notification.create({
      userId: request.hunterId,
      message: `Your request for the project '${request.name}' has been rejected.`,
      type: 'request_rejected',
      referenceId: request.id,
    });

    // Optionally, perform actions like marking the request as rejected
    await request.update({ isDeleted: 1 }); // Soft delete the rejected request

    res.status(200).json({ message: "Request rejected successfully" });
  } catch (error) {
    console.error("Error rejecting request:", error);
    res.status(500).json({ error: "Failed to reject the request" });
  }
};

// Get all requests by posterId
const getRequestsByPosterId = async (req, res) => {
  try {
    const posterId = req.user.id; // Assuming authentication middleware sets req.user

    const requests = await Request.findAll({
      where: { posterId, isDeleted: false }, // Filter by posterId and exclude deleted requests
      include: [
        {
          model: Project,
          attributes: ["id", "name", "status"], // Include project details
        },
        {
          model: User,
          as: "hunter", // Include hunter details
          attributes: ["id", "name", "email"],
        },
      ],
    });

    if (!requests.length) {
      return res.status(404).json({ message: "No requests found for this poster." });
    }

    res.status(200).json({ requests });
  } catch (error) {
    console.error("Error fetching requests by poster:", error);
    res.status(500).json({ error: "Failed to retrieve requests." });
  }
};

module.exports = {
  createRequest,
  approveRequest,
  rejectRequest,
  getRequestsByPosterId,
};
