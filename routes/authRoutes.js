const express = require("express");
const {
  signUp,
  login,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
  changePassword, // Import the changePassword function
} = require("../controllers/authController");

const router = express.Router();

// POST request to sign up a new user
router.post("/signup", signUp);

// POST request to log in an existing user
router.post("/login", login);

// PUT request to change password (use the changePassword controller)
router.put("/change-password", changePassword); // Fixed this line

// Routes for user management (admin routes)
router.get("/", getAllUser); // Get all users
router.get("/:id", getUserById); // Get user by ID
router.put("/:id", updateUser); // Update user by ID
router.delete("/:id", deleteUser); // Delete user by ID

module.exports = router;
