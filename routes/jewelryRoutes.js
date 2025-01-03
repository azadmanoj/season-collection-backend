const express = require('express');
const router = express.Router();
const jewelryController = require('../controllers/jewelryController');

// Routes for jewelry API
router.get('/', jewelryController.getAllJewelry);        // Get all jewelry
router.get('/:id', jewelryController.getJewelryById);   // Get jewelry by ID
router.post('/', jewelryController.createJewelry);      // Create new jewelry
router.put('/:id', jewelryController.updateJewelry);    // Update jewelry by ID
router.delete('/:id', jewelryController.deleteJewelry); // Delete jewelry by ID

module.exports = router;
