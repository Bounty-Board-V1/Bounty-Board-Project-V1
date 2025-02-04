const Role = require("../models/Role");

// Create a new role
const createRole = async (req, res) => {
  try {
    const { role, permission } = req.body;

    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    const newRole = await Role.create({
      role,
      permission: permission || [],
    });

    res.status(201).json({ message: "Role created successfully", data: newRole });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createRole,
};
