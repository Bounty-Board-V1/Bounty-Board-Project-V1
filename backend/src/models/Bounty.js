const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Bounty = sequelize.define("Bounty", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
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
});

module.exports = Bounty;