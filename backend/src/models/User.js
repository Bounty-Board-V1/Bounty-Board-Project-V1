const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM("admin", "poster", "hunter"),
    allowNull: false,
    defaultValue: "hunter",
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cv: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  profileCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // By default, the profile is not completed
    allowNull: false,
  },
  techStack: {
    type: DataTypes.ARRAY(DataTypes.STRING), // Use ARRAY for PostgreSQL
    allowNull: true,
    defaultValue: [], // Default to an empty array
  },
});

module.exports = User;
