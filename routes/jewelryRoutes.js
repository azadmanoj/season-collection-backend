const express = require("express");
const multer = require("multer"); // Import multer
const router = express.Router();
const jewelryController = require("../controllers/jewelryController");

// Configure multer (for example, saving images in an "uploads" folder)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }); // Define the upload middleware

// Routes for jewelry API
router.get("/", jewelryController.getAllJewelry); // Get all jewelry
router.get("/:id", jewelryController.getJewelryById); // Get jewelry by ID

// Use upload.array() to handle multiple file uploads
router.post(
  "/",
  upload.array("images"), // Handle multiple file uploads
  jewelryController.createJewelry
);

// Create new jewelry
router.put("/:id", jewelryController.updateJewelry); // Update jewelry by ID
router.delete("/:id", jewelryController.deleteJewelry); // Delete jewelry by ID

module.exports = router;
