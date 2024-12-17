// const User = require("../models/User");

// exports.createUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const user = await User.create({ name, email, password });
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.getUsers = async (req, res) => {
//   try {
//     const users = await User.findAll();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.getAllUsers = (req, res) => res.send("Get all users");
exports.getUser = (req, res) => res.send("Get a single user");
exports.createUser = (req, res) => res.send("Create a new user");
exports.updateUser = (req, res) => res.send("Update user");
exports.deleteUser = (req, res) => res.send("Delete user");
