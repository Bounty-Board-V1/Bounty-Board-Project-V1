const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Project = require("./Project");

const File = sequelize.define("File", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

File.belongsTo(Project, { foreignKey: "projectId" });

module.exports = File;
