const { User, Role, Team } = require("../models"); // Ensure Team is included for relationships
const bcrypt = require("bcrypt");

// User Registration
const createUserProfile = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const roleId = req.body.roleId || 2;

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Email domain validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@menadevs\.io$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Email must be a valid @menadevs.io address." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already in use." });
    }

    // Password confirmation validation
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    // Password strength validation (min 6 chars, 1 uppercase, 1 lowercase, 1 digit)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one digit.",
      });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      roleId,
    });

    // Fetch user with role details
    const userWithRole = await User.findByPk(newUser.id, {
      include: {
        model: Role,
        attributes: ["role"], // Fetch only the role name
      },
    });

    // Response without sending the password
    res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: userWithRole.id,
        name: userWithRole.name,
        email: userWithRole.email,
        role: userWithRole.Role.role, // Return role name instead of roleId
      },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Fetch User Profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: [
        "id",
        "name",
        "email",
        "roleId",
        "image",
        "profileCompleted",
        "techStack",
      ],
      include: [
        {
          model: Role,
          attributes: ["id", "role"],
        },
        {
          model: Team,
          attributes: ["id", "name"], // Include team info if applicable
        },
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
    const { password, techStack } = req.body;

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
      {
        password: hashedPassword,
        image,
        cv,
        techStack,
        profileCompleted: true,
      },
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
  console.log("Files received:", req.files);
  try {
    const { name, email, profileCompleted, techStack } = req.body;

    // Log files received
    console.log("Files received:", req.files);

    // Parse techStack (if provided) from a JSON string
    let parsedTechStack = [];
    if (techStack) {
      try {
        parsedTechStack = JSON.parse(techStack);
      } catch (err) {
        return res.status(400).json({ error: "Invalid format for techStack." });
      }
    }

    // Construct updatedFields object
    const updatedFields = {
      ...(name && { name }),
      ...(email && { email }),
      ...(req.files.CV && { CV: `/uploads/${req.files.CV[0].filename}` }),
      ...(req.files.image && { image: `/uploads/${req.files.image[0].filename}` }),
      ...(profileCompleted !== undefined && { profileCompleted: profileCompleted === "true" }),
      ...(parsedTechStack.length > 0 && { techStack: parsedTechStack }),
    };

    // Update user in the database
    const userId = req.user.id;
    const [updated] = await User.update(updatedFields, {
      where: { id: userId },
    });

    if (!updated) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.status(200).json({ message: "Profile updated successfully." });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ error: "An error occurred while updating the profile." });
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
      return res.status(400).json({ message: "New passwords do not match." });
    }

    // Get the current user (assuming authentication middleware sets req.user)
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Current password is incorrect." });
    }

    // Check if the new password is different from the current password
    if (await bcrypt.compare(newPassword, user.password)) {
      return res.status(400).json({
        message: "New password must be different from the current password.",
      });
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

module.exports = {
  createUserProfile,
  getUserProfile,
  completeUserProfile,
  updateUserProfile,
  resetPassword,
};
