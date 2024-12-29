const { User } = require("../models");
const jwt = require("jsonwebtoken");

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
      { expiresIn: "1h" }
    );

    // Redirect based on profile completion status
    if (!user.profileCompleted) {
      return res.redirect(
        `http://localhost:3000/complete-profile?token=${token}`
      );
    }

    res.redirect(`http://localhost:3000/profile?token=${token}`);
  } catch (error) {
    console.error("Error handling OAuth callback:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        console.error("Error during logout:", err);
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logout successful" });
    });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { microsoftCallback, logout };
