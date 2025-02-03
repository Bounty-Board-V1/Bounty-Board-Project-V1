const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

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
  statusId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  section: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  selected: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isDeleted: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Milestone;