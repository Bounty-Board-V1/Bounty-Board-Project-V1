
const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Notification = sequelize.define("Notification", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false, // E.g., "request_created", "request_approved"
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  requestId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Optional, if related to a specific request
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Optional, if related to a specific project
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false, // Description of the notification
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Tracks if the notification is read
  },
});

module.exports = Notification;
