"use strict";

const bcrypt = require("bcrypt");
const { User, Role } = require("../src/models"); // Import User and Role models

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Ensure Role exists
    let hunterRole = await Role.findOne({ where: { role: "Hunter" } });

    if (!hunterRole) {
      hunterRole = await Role.create({ role: "Hunter", permission: ["ALL"] });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash("Hunter2024", 10);

    // Insert the admin user
    await User.create({
      name: "Hunter",
      email: "hunter@menadevs.io",
      password: hashedPassword,
      roleId: hunterRole.id, // Assign the Admin role
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the admin user
    await queryInterface.bulkDelete(
      "Users",
      { email: "hunter@menadevs.io" },
      {}
    );
  },
};
