const { Milestone, Project } = require("../models"); // Ensure that Project model is included for relationships

// Get all milestones for a project
const getAllMilestones = async (req, res) => {
  try {
    const { projectId } = req.params;

    const milestones = await Milestone.findAll({
      where: { projectId, isDeleted: 0 }, // Only show non-deleted milestones
      include: [
        {
          model: Project,
          attributes: ["id", "name"], // Include project details
        },
      ],
      order: [["id", "ASC"]],
    });

    if (!milestones.length) {
      return res.status(404).json({ message: "No milestones found." });
    }

    res.status(200).json({ milestones });
  } catch (error) {
    console.error("Error fetching milestones:", error);
    res.status(500).json({ error: "Failed to retrieve milestones." });
  }
};

// Get a single milestone by ID
const getMilestone = async (req, res) => {
  try {
    const { id } = req.params;

    const milestone = await Milestone.findByPk(id, {
      include: [
        {
          model: Project,
          attributes: ["id", "name"],
        },
      ],
    });

    if (!milestone) {
      return res.status(404).json({ message: "Milestone not found." });
    }

    res.status(200).json({ milestone });
  } catch (error) {
    console.error("Error fetching milestone:", error);
    res.status(500).json({ error: "Failed to retrieve milestone." });
  }
};

// Create a new milestone
const createMilestone = async (req, res) => {
  try {
    const { description, projectId, statusId, section, selected } = req.body;

    if (!description || !projectId) {
      return res.status(400).json({ error: "Description and projectId are required." });
    }

    const newMilestone = await Milestone.create({
      description,
      projectId,
      statusId,
      section,
      selected,
    });

    res.status(201).json({ message: "Milestone created successfully.", milestone: newMilestone });
  } catch (error) {
    console.error("Error creating milestone:", error);
    res.status(500).json({ error: "Failed to create milestone." });
  }
};

// Update a milestone (e.g., status, section, etc.)
const updateMilestone = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, statusId, section, selected } = req.body;

    const milestone = await Milestone.findByPk(id);
    if (!milestone) {
      return res.status(404).json({ message: "Milestone not found." });
    }

    // Update milestone fields
    milestone.description = description ?? milestone.description;
    milestone.statusId = statusId ?? milestone.statusId;
    milestone.section = section ?? milestone.section;
    milestone.selected = selected ?? milestone.selected;

    await milestone.save();

    res.status(200).json({ message: "Milestone updated successfully.", milestone });
  } catch (error) {
    console.error("Error updating milestone:", error);
    res.status(500).json({ error: "Failed to update milestone." });
  }
};

// Delete a milestone (soft delete, set isDeleted to 1)
const deleteMilestone = async (req, res) => {
  try {
    const { id } = req.params;

    const milestone = await Milestone.findByPk(id);
    if (!milestone) {
      return res.status(404).json({ message: "Milestone not found." });
    }

    milestone.isDeleted = 1; // Soft delete by marking as deleted
    await milestone.save();

    res.status(200).json({ message: "Milestone deleted successfully." });
  } catch (error) {
    console.error("Error deleting milestone:", error);
    res.status(500).json({ error: "Failed to delete milestone." });
  }
};

module.exports = {
  getAllMilestones,
  getMilestone,
  createMilestone,
  updateMilestone,
  deleteMilestone,
};
