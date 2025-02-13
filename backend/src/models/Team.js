const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Team = sequelize.define("Team", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createrId: {
    type: DataTypes.INTEGER,
    allowNull: false, // Ensure a creator must be assigned
    references: {
      model: "Users", // Refers to the Users table
      key: "id",
    },
    onDelete: "CASCADE", // Ensures that if a user is deleted, their teams are also handled
  },
  isDeleted: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Team;
