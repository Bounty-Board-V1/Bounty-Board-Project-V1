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
  members: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
  isDeleted: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Team;