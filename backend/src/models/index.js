const sequelize = require("../config/database");
const Role = require("./Role");
const User = require("./User");
const Project = require("./Project");
const Milestone = require("./Milestone");
const Notification = require("./Notification");
const Request = require("./Request");
const Status = require("./Status");
const SubmissionStatus = require("./SubmissionStatus");
const Team = require("./Team");

// ----------------------
// User-Role Relationship
// ----------------------
User.belongsTo(Role, { foreignKey: "roleId" });
Role.hasMany(User, { foreignKey: "roleId" });

// ----------------------
// User-Team Relationship
// ----------------------
User.belongsTo(Team, { foreignKey: "teamId" });
Team.hasMany(User, { foreignKey: "teamId" });

// ----------------------
// User-Notification Relationship
// ----------------------
User.hasMany(Notification, { foreignKey: "userId" });
Notification.belongsTo(User, { foreignKey: "userId" });

// ----------------------
// User-Project Relationship (Poster of Project)
// ----------------------
User.hasMany(Project, { foreignKey: "posterId", as: "postedProjects" });
Project.belongsTo(User, { foreignKey: "posterId", as: "poster" });

// ----------------------
// Team-Project Request Relationship
// ----------------------
// A Team can request multiple projects
Team.hasMany(Request, { foreignKey: "teamId", as: "requests" });
Request.belongsTo(Team, { foreignKey: "teamId", as: "requestingTeam" });

// A Project can receive multiple requests from teams
Project.hasMany(Request, { foreignKey: "projectId", as: "requests" });
Request.belongsTo(Project, { foreignKey: "projectId", as: "requestedProject" });

// ----------------------
// Request-User Relationship (Project Poster receives requests)
// ----------------------
// A project poster (User) receives multiple requests for their project
User.hasMany(Request, { foreignKey: "posterId", as: "receivedRequests" });
Request.belongsTo(User, { foreignKey: "posterId", as: "poster" });

// ----------------------
// Project-Team Assignment (After Approval)
// ----------------------
// A Project can have only ONE approved team
Project.belongsTo(Team, { foreignKey: "approvedTeamId", as: "approvedTeam" });
Team.hasOne(Project, { foreignKey: "approvedTeamId", as: "assignedProject" });

// ----------------------
// Project-Status Relationship
// ----------------------
Project.belongsTo(Status, { foreignKey: "statusId" });
Status.hasMany(Project, { foreignKey: "statusId" });

// ----------------------
// Project-Milestone Relationship
// ----------------------
Project.hasMany(Milestone, { foreignKey: "projectId" });
Milestone.belongsTo(Project, { foreignKey: "projectId" });

// ----------------------
// Milestone-SubmissionStatus Relationship
// ----------------------
Milestone.belongsTo(SubmissionStatus, { foreignKey: "statusId" });
SubmissionStatus.hasMany(Milestone, { foreignKey: "statusId" });

// ----------------------
// Export Models
// ----------------------
module.exports = {
  sequelize,
  Role,
  User,
  Project,
  Milestone,
  Notification,
  Request,
  Status,
  SubmissionStatus,
  Team,
};
