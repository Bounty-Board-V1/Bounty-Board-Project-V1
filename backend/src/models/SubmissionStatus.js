const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SubmissionStatus = sequelize.define("SubmissionStatus", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isDeleted: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = SubmissionStatus;