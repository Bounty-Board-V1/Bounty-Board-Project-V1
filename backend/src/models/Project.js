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
    type: DataTypes.STRING,
    allowNull: true,
  },
  posterId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  statusId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  rewardAmount: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  techStack: {
    type: DataTypes.JSON, // Store array as JSON
    allowNull: true,
  },
  estimatedTime: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  teamId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  timeline: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  isDeleted: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Project;
