const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Notification = sequelize.define("Notification", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Notification.belongsTo(User, { foreignKey: "userId" });

module.exports = Notification;
