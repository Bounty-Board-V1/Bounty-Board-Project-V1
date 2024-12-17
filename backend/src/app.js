const express = require("express");
const sequelize = require("./config/database");
require("dotenv").config();

// Models
const User = require("./models/User");

// Routes
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(express.json());

// Test Database Connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Unable to connect to the database:", err));

// Synchronize the database
sequelize
  .sync({ force: false }) // Set force: true to drop and recreate tables
  .then(() => console.log("Database synchronized"))
  .catch((err) => console.error("Error synchronizing database:", err));

// Example Route
app.get("/", (req, res) => res.send("API is running..."));

// Main Route
app.use("/api", userRoutes);

// Export the app
module.exports = app;
