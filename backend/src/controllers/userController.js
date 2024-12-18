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

// Update User Profile
const updateUserProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash password if provided
    let hashedPassword = undefined;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Prepare updated fields
    const updatedFields = {
      ...(name && { name }),
      ...(email && { email }),
      ...(password && { password: hashedPassword }),
      ...(req.files?.image && { image: `/uploads/${req.files.image[0].filename}` }),
      ...(req.files?.cv && { cv: `/uploads/${req.files.cv[0].filename}` }),
    };

    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ message: "No fields to update." });
    }

    // Update user profile
    const [updated] = await User.update(updatedFields, {
      where: { id: req.user.id },
    });

    if (!updated) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Profile updated successfully!" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getUserProfile, completeUserProfile, updateUserProfile };
