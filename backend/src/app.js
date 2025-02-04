const express = require("express");
const { sequelize } = require("./models"); // Sequelize instance
const session = require("express-session");
const passport = require("./config/microsoftAuth");
const cors = require("cors");

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const requestRoutes = require("./routes/requestRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const teamRoutes = require("./routes/teamRoutes");
const milestoneRoutes = require("./routes/teamRoutes");

require("dotenv").config();

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: "*",
  })
);

// Middleware
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Test database connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Unable to connect to the database:", err));

// Synchronize models
sequelize
  .sync({ force: false }) // Use force: true ONLY for development resets
  .then(() => console.log("Database synchronized"))
  .catch((err) => console.error("Error synchronizing database:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/milestone", milestoneRoutes);

// Base route
app.get("/", (req, res) => res.send("Bounty Board API is running..."));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

module.exports = app;
