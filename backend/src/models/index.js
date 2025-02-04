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
Role.hasMany(User, { foreignKey: "userId" }); // Role has many Users

User.hasMany(Project, { foreignKey: "posterId", as: "postedProjects" }); // User (poster) creates projects
User.hasMany(Project, { foreignKey: "hunterId", as: "assignedProjects" }); // User (hunter) is assigned projects

Project.belongsTo(User, { foreignKey: "posterId", as: "poster" }); // Project belongs to the poster
Project.belongsTo(User, { foreignKey: "hunterId", as: "hunter" }); // Project belongs to the hunter

Project.belongsTo(Status, { foreignKey: "statusId" }); // Project belongs to Status
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
