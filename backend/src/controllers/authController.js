const { User,Role } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_EXPIRES_IN = "1h";
const microsoftCallback = async (req, res) => {
  try {
    const { email, name } = req.user;

    // Check if the user already exists in the database
    let user = await User.findOne({ where: { email } });

    if (!user) {
      // User is new, create a record with incomplete profile
      user = await User.create({
        name,
        email,
        password: null, // OAuth users will set the password later
        profileCompleted: false,
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Redirect based on profile completion status
    if (!user.profileCompleted) {
      return res.redirect(`http://localhost:5173/account?token=${token}`);
    }

    res.redirect(`http://localhost:5173/account?token=${token}`);
  } catch (error) {
    console.error("Error handling OAuth callback:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // Find user by email and include the Role model
    const user = await User.findOne({
      where: { email },
      include: {
        model: Role,
        attributes: ["role"], // Fetch only the role name
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.Role.role, // Get role name instead of roleId
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    // Send token in response
    res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.Role.role, // Return role name
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


const logout = (req, res) => {
  try {
    res.clearCookie("token"); // If using cookies
    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { microsoftCallback, logout, loginUser };
