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
  isDeleted: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Team;