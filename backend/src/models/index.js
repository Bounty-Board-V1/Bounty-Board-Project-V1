const sequelize = require("../config/database");
const Role = require("./Role");
const User = require("./User");
const Project = require("./Project");
const Milestone = require("./Milestone");
const Reward = require("./Reward");
const Notification = require("./Notification");
const Request = require("./Request");
const Status = require("./Status");
const SubmissionStatus = require("./SubmissionStatus");
const Team = require("./Team");

// Relationships
User.belongsTo(Role, { foreignKey: "roleId" }); // User belongs to Role
Role.hasMany(User, { foreignKey: "roleId" }); // Role has many Users

User.hasMany(Project, { foreignKey: "posterId", as: "postedProjects" }); // User (poster) creates projects
User.hasMany(Project, { foreignKey: "hunterId", as: "assignedProjects" }); // User (hunter) is assigned projects

Project.belongsTo(User, { foreignKey: "posterId", as: "poster" }); // Project belongs to the poster
Project.belongsTo(User, { foreignKey: "hunterId", as: "hunter" }); // Project belongs to the hunter

Project.belongsTo(Status, { foreignKey: "statusId" }); // Project belongs to Status
Status.hasMany(Project, { foreignKey: "statusId" });

Project.hasMany(Milestone, { foreignKey: "projectId" });
Milestone.belongsTo(Project);
Milestone.belongsTo(SubmissionStatus, { foreignKey: "statusId" });

Project.hasOne(Reward, { foreignKey: "projectId" });
Reward.belongsTo(Project);

User.hasMany(Notification, { foreignKey: "userId" });
Notification.belongsTo(User);

Request.belongsTo(User, { foreignKey: "hunterId", as: "hunter" });
Request.belongsTo(User, { foreignKey: "posterId", as: "poster" });
Request.belongsTo(Project, { foreignKey: "projectId" });

Team.belongsTo(Project, { foreignKey: "teamId" });
Project.hasOne(Team, { foreignKey: "teamId" });

Team.hasMany(User, { foreignKey: "id" });

module.exports = {
  sequelize,
  Role,
  User,
  Project,
  Milestone,
  Reward,
  Notification,
  Request,
  Status,
  SubmissionStatus,
  Team,
};
