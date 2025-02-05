"use strict";

const bcrypt = require("bcrypt");
const { User, Role } = require("../src/models"); // Import User and Role models

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Ensure Role exists
    let posterRole = await Role.findOne({ where: { role: "Poster" } });

    if (!posterRole) {
      posterRole = await Role.create({ role: "Poster", permission: ["ALL"] });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash("Poster2024", 10);

    // Insert the admin user
    await User.create({
      name: "Poster",
      email: "poster@menadevs.io",
      password: hashedPassword,
      roleId: posterRole.id, // Assign the Admin role
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the admin user
    await queryInterface.bulkDelete(
      "Users",
      { email: "poster@menadevs.io" },
      {}
    );
  },
};
