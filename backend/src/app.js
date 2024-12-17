const express = require("express");
const sequelize = require("./models").sequelize; // Sequelize instance
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const milestoneRoutes = require("./routes/milestoneRoutes");
const rewardRoutes = require("./routes/rewardRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const fileRoutes = require("./routes/fileRoutes");

const app = express();

// Middleware
app.use(express.json());

// Test database connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Unable to connect to the database:", err));

// Synchronize models
sequelize
  .sync({ force: true }) // Use force: true ONLY for development resets
  .then(() => console.log("Database synchronized"))
  .catch((err) => console.error("Error synchronizing database:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/milestones", milestoneRoutes);
app.use("/api/rewards", rewardRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/files", fileRoutes);

// Base route
app.get("/", (req, res) => res.send("Bounty Board API is running..."));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

module.exports = app;
