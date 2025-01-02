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
        "techStack",
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
    const { name, secondaryEmail } = req.body;

    // Prepare updated fields
    const updatedFields = {
      ...(name && { name }), // Update name if provided
      ...(secondaryEmail && { secondaryEmail }), // Update secondary email if provided
      ...(req.files?.cv && { cv: `/uploads/${req.files.cv[0].filename}` }), // Handle CV upload
      ...(req.files?.image && { image: `/uploads/${req.files.image[0].filename}` }), // Handle image upload
    };

    // Ensure there are fields to update
    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ message: "No fields to update." });
    }

    // Update user profile in the database
    const [updated] = await User.update(updatedFields, {
      where: { id: req.user.id }, // Assuming `req.user.id` contains the authenticated user's ID
    });

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated successfully!" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const resetPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "New passwords do not match." });
    }

    // Get the current user (assuming authentication middleware sets req.user)
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Current password is incorrect." });
    }

    // Check if the new password is different from the current password
    if (await bcrypt.compare(newPassword, user.password)) {
      return res
        .status(400)
        .json({ message: "New password must be different from the current password." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    await user.update({ password: hashedPassword });

    res.json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};



module.exports = { getUserProfile, completeUserProfile, updateUserProfile,resetPassword };
