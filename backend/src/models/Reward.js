const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Reward = sequelize.define("Reward", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isDeleted: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Reward;