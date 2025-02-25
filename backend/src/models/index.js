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
// User-Team Relationship (User can belong to only one Team)
User.belongsTo(Team, { foreignKey: 'teamId' });  // A user belongs to one team
Team.hasMany(User, { foreignKey: 'teamId' });   // A team can have many users

// ----------------------
// Team-Creator Relationship (User who created the team)
User.hasMany(Team, { foreignKey: "createrId", as: "createdTeams" });
Team.belongsTo(User, { foreignKey: "createrId", as: "creater" });

// ----------------------
// Team-Members Relationship (One user can only belong to one team)
Team.hasMany(User, { foreignKey: "teamId", as: "members" });  // One team can have many members

// ----------------------
// User-Notification Relationship
User.hasMany(Notification, { foreignKey: "userId" });
Notification.belongsTo(User, { foreignKey: "userId" });

// ----------------------
// User-Project Relationship (Poster of Project)
User.hasMany(Project, { foreignKey: "posterId", as: "postedProjects" });
Project.belongsTo(User, { foreignKey: "posterId", as: "poster" });

// ----------------------
// Team-Project Request Relationship
Team.hasMany(Request, { foreignKey: "teamId", as: "requests" });
Request.belongsTo(Team, { foreignKey: "teamId", as: "requestingTeam" });

Project.hasMany(Request, { foreignKey: "projectId", as: "requests" });
Request.belongsTo(Project, { foreignKey: "projectId", as: "requestedProject" });

// ----------------------
// Request-User Relationship (Project Poster receives requests)
User.hasMany(Request, { foreignKey: "posterId", as: "receivedRequests" });
Request.belongsTo(User, { foreignKey: "posterId", as: "poster" });

// ----------------------
// Request-User (Receiver)
User.hasMany(Request, { foreignKey: "receiverId", as: "requestsReceived" });
Request.belongsTo(User, { foreignKey: "receiverId", as: "receiver" });

// ----------------------
// Project-Team Assignment (After Approval)
Project.belongsTo(Team, { foreignKey: "approvedTeamId", as: "approvedTeam" });
Team.hasOne(Project, { foreignKey: "approvedTeamId", as: "assignedProject" });

// ----------------------
// Project-Milestone Relationship
Project.hasMany(Milestone, { foreignKey: "projectId" });
Milestone.belongsTo(Project, { foreignKey: "projectId" });

// ----------------------
// Milestone-SubmissionStatus Relationship
Milestone.belongsTo(SubmissionStatus, { foreignKey: "statusId" });
SubmissionStatus.hasMany(Milestone, { foreignKey: "statusId" });

// ----------------------
// Export Models
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
