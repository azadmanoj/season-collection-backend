const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid"); // Import UUID package

// Sign-up Controller
const signUp = async (req, res) => {
  const { email, password, firstName, lastName, phoneNumber, address } =
    req.body;

  // Validate required fields
  if (!email) {
    return res.status(400).json({
      message: "SC: PLEASE ENTER EMAIL",
    });
  }

  if (!password) {
    return res.status(400).json({
      message: "SC: PLEASE ENTER password",
    });
  }

  if (!firstName) {
    return res.status(400).json({
      message: "SC: PLEASE ENTER firstName",
    });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate a 4-digit UUID for userId (using the first part of the UUID)
    const userId = `${firstName.substring(0, 3)}-${uuidv4().split("-")[0]}`;

    // Extract the first name from the full name (assuming name is in the format "First Last")

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName, // Store the first name separately
      phoneNumber,
      profile: "User",
      address,
      userId, // Add the 4-digit UUID as userId
    });

    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Login Controller
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, profile: user.profile },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

async function changePassword(req, res) {
  const { currentPassword, newPassword, id } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne(id);
    console.log("🚀 ~ changePassword ~ user:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the current password matches the stored password
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash the new password before saving it
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    user.password = hashedNewPassword;

    // Save the updated user
    await user.save();

    // Send success response
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    // Find the user by some unique identifier (in this case, the ID)
    const user = await User.findOne({ id: req.params.id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user properties with the data from req.body
    Object.assign(user, req.body);

    // Save the updated user
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};

module.exports = {
  signUp,
  login,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
  changePassword,
};
