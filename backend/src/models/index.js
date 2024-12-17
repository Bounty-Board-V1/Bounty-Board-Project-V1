const sequelize = require("../config/database");
const User = require("./User");
const Project = require("./Project");
const Milestone = require("./Milestone");
const Reward = require("./Reward");
const Notification = require("./Notification");
const File = require("./File");

// Relationships
User.hasMany(Project, { foreignKey: "posterId", as: "postedProjects" }); // User (poster) creates projects
User.hasMany(Project, { foreignKey: "hunterId", as: "assignedProjects" }); // User (hunter) is assigned projects

Project.belongsTo(User, { foreignKey: "posterId", as: "poster" }); // Project belongs to the poster
Project.belongsTo(User, { foreignKey: "hunterId", as: "hunter" }); // Project belongs to the hunter

Project.hasMany(Milestone, { foreignKey: "projectId" });
Milestone.belongsTo(Project);

Project.hasOne(Reward, { foreignKey: "projectId" });
Reward.belongsTo(Project);

Project.hasMany(File, { foreignKey: "projectId" });
File.belongsTo(Project);

User.hasMany(Notification, { foreignKey: "userId" });
Notification.belongsTo(User);

module.exports = {
  sequelize,
  User,
  Project,
  Milestone,
  Reward,
  Notification,
  File,
};
