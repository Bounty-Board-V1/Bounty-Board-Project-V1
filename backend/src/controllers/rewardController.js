const { Reward, Project } = require("../models");

// Create a new reward
const createReward = async (req, res) => {
  try {
    const { amount, currency, projectId } = req.body;

    // Ensure the project exists before creating a reward
    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Create the reward
    const reward = await Reward.create({ amount, currency });
    
    // Update project with the reward amount
    project.rewardAmount = amount;
    await project.save();

    res.status(201).json({ reward, message: "Reward created successfully!" });
  } catch (error) {
    console.error("Error creating reward:", error);
    res.status(500).json({ error: "Failed to create reward" });
  }
};

// Get all rewards
const getAllRewards = async (req, res) => {
  try {
    const rewards = await Reward.findAll({
      where: { isDeleted: 0 }, // Filter out deleted rewards
      include: [
        {
          model: Project,
          attributes: ["id", "title", "description"],
        },
      ],
    });

    res.status(200).json({ rewards });
  } catch (error) {
    console.error("Error fetching rewards:", error);
    res.status(500).json({ error: "Failed to retrieve rewards" });
  }
};

// Get a single reward by ID
const getRewardById = async (req, res) => {
  try {
    const { id } = req.params;

    const reward = await Reward.findByPk(id, {
      where: { isDeleted: 0 },
      include: [
        {
          model: Project,
          attributes: ["id", "title", "description"],
        },
      ],
    });

    if (!reward) {
      return res.status(404).json({ error: "Reward not found" });
    }

    res.status(200).json({ reward });
  } catch (error) {
    console.error("Error fetching reward:", error);
    res.status(500).json({ error: "Failed to retrieve reward" });
  }
};

// Update a reward
const updateReward = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, currency } = req.body;

    const reward = await Reward.findByPk(id);
    if (!reward) {
      return res.status(404).json({ error: "Reward not found" });
    }

    reward.amount = amount || reward.amount;
    reward.currency = currency || reward.currency;

    await reward.save();

    res.status(200).json({ reward, message: "Reward updated successfully!" });
  } catch (error) {
    console.error("Error updating reward:", error);
    res.status(500).json({ error: "Failed to update reward" });
  }
};

// Delete a reward
const deleteReward = async (req, res) => {
  try {
    const { id } = req.params;

    const reward = await Reward.findByPk(id);
    if (!reward) {
      return res.status(404).json({ error: "Reward not found" });
    }

    reward.isDeleted = 1; // Mark as deleted
    await reward.save();

    res.status(200).json({ message: "Reward deleted successfully!" });
  } catch (error) {
    console.error("Error deleting reward:", error);
    res.status(500).json({ error: "Failed to delete reward" });
  }
};

module.exports = {
  createReward,
  getAllRewards,
  getRewardById,
  updateReward,
  deleteReward,
};
