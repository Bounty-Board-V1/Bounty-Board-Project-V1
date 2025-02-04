const express = require("express");
// const passport = require("../config/microsoftAuth");
const { logout, loginUser } = require("../controllers/authController");

const router = express.Router();

// // Microsoft OAuth Login Route
// router.get(
//   "/microsoft",
//   passport.authenticate("azure_ad_oauth2", { scope: ["profile", "email"] })
// );

// // Microsoft OAuth Callback Route
// router.get(
//   "/microsoft/callback",
//   passport.authenticate("azure_ad_oauth2", { failureRedirect: "/login" }),
//   microsoftCallback
// );

// Login Route
router.post("/login", loginUser);

// Logout Route
router.post("/logout", logout);

module.exports = router;
