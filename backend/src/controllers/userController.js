const { User } = require("../models");
const bcrypt = require("bcrypt");

// Fetch User Profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: [
        "id",
        "name",
        "email",
        "role",
        "image",
        "cv",
        "profileCompleted",
      ],
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Complete User Profile
const completeUserProfile = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Retrieve file paths
    const image = req.files?.image
      ? `/uploads/${req.files.image[0].filename}`
      : null;
    const cv = req.files?.cv ? `/uploads/${req.files.cv[0].filename}` : null;

    // Update user profile
    await User.update(
      { password: hashedPassword, image, cv, profileCompleted: true },
      { where: { id: req.user.id } }
    );

    res.json({ message: "Profile completed successfully!" });
  } catch (error) {
    console.error("Error completing profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getUserProfile, completeUserProfile };
