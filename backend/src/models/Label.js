const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Label = sequelize.define("Label", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Label;