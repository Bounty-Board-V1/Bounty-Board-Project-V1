"use strict";

const bcrypt = require("bcrypt");
const { User, Role } = require("../src/models"); // Import User and Role models

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Ensure Role exists
    let adminRole = await Role.findOne({ where: { role: "Admin" } });

    if (!adminRole) {
      adminRole = await Role.create({ role: "Admin", permission: ["ALL"] });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash("Admin2024", 10);

    // Insert the admin user
    await User.create({
      name: "Admin",
      email: "admin@menadevs.io",
      password: hashedPassword,
      roleId: adminRole.id, // Assign the Admin role
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the admin user
    await queryInterface.bulkDelete(
      "Users",
      { email: "admin@menadevs.io" },
      {}
    );
  },
};
