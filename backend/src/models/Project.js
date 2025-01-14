const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");


const Project = sequelize.define("Project", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  posterId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  hunterId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  labelId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("open", "in-progress", "completed", "closed"),
    defaultValue: "open",
  },
  milestoneType: {
    type: DataTypes.ENUM("single", "multiple"),
    allowNull: false,
    defaultValue: "single",
  },
  submissionStatus: {
    type: DataTypes.ENUM("not-submitted", "submitted", "approved", "rejected"),
    defaultValue: "not-submitted",
  },
  estimatedTime: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  techStack: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rewardAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  }
});

module.exports = Project;
