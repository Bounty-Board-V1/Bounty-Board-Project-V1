const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Request = sequelize.define("Request", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  bountyId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Request;