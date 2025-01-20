const express = require("express");
const multer = require("multer"); // Import multer
const router = express.Router();
const ordersController = require("../controllers/ordersController");

// Routes for orders API
router.get("/", ordersController.getAllOrders); // Get all orders
router.get("/:id", ordersController.getOrdersById); // Get orders by ID

// Use upload.array() to handle multiple file uploads
router.post("/", ordersController.createOrders);

// Create new orders
router.put("/:id", ordersController.updateOrders); // Update orders by ID
router.delete("/:id", ordersController.deleteOrders); // Delete orders by ID

module.exports = router;
