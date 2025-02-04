"use strict";

const { Role } = require("../src/models"); // Import the Role model

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Role.bulkCreate([
      { role: "Admin", permission: ["CREATE", "UPDATE", "DELETE", "VIEW"] },
      { role: "Hunter", permission: ["VIEW", "APPLY"] },
      { role: "Poster", permission: ["CREATE", "VIEW", "UPDATE"] },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Roles", null, {}); // Rollback seeding
  },
};
