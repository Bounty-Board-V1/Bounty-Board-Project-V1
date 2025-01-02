const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Project = require("./Project");

const Reward = sequelize.define("Reward", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: "USD",
  },
});

Reward.belongsTo(Project, { foreignKey: "projectId" });

module.exports = Reward;
