const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Project = require("./Project");

const Milestone = sequelize.define("Milestone", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("in-progress", "completed", "reassigned"),
    defaultValue: "in-progress",
  },
  approvalStatus: {
    type: DataTypes.ENUM("pending", "approved", "rejected"),
    defaultValue: "pending",
  },
  rejectionReason: {
    type: DataTypes.TEXT, // Reason for rejection
    allowNull: true,
  },
  suggestion: {
    type: DataTypes.TEXT, // Instructions for the hunter
    allowNull: true,
  },
  isFinalMilestone: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Indicates if this is the last milestone
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

Milestone.belongsTo(Project, { foreignKey: "projectId" });

module.exports = Milestone;
