const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Request = sequelize.define(
  "Request",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    posterId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Default value for soft deletion
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
    paranoid: true, // Enable soft delete, adds deletedAt field
  }
);
module.exports = Request;
