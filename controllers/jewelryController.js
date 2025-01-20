const Jewelry = require("../models/jewelryModel");

// Controller method for creating jewelry (handling Base64 images)
exports.createJewelry = async (req, res) => {

  // Extract image data and other jewelry fields from the body
  const {
    title,
    price,
    description,
    collection,
    category,
    wishList,
    status,
    published,
    addToCart,
    stock,
    images, // Expecting Base64 encoded images in the 'images' field
  } = req.body;

  // Check if images are provided
  if (!images || images.length === 0) {
    return res.status(400).json({ message: "At least one image is required" });
  }

  // Create a new jewelry item
  const jewelry = new Jewelry({
    title,
    images, // Store the Base64 image data directly
    price,
    description,
    collection,
    category,
    wishList,
    status,
    published,
    addToCart,
    stock,
  });

  try {
    // Save the jewelry item to the database
    const newJewelry = await jewelry.save();
    res.status(201).json(newJewelry); // Respond with the newly created jewelry
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all jewelry items
exports.getAllJewelry = async (req, res) => {
  try {
    const jewelryItems = await Jewelry.find();
    res.json(jewelryItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get jewelry by ID
exports.getJewelryById = async (req, res) => {
  try {
    const jewelry = await Jewelry.findOne({ id: req.params.id });
    if (!jewelry) return res.status(404).json({ message: "Jewelry not found" });
    res.json(jewelry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update jewelry by ID
exports.updateJewelry = async (req, res) => {
  try {
    const updatedJewelry = await Jewelry.findOneAndUpdate(
      { id: req.params.id }, // Query by productId
      req.body,
      { new: true } // Return the updated document
    );
    if (!updatedJewelry)
      return res.status(404).json({ message: "Jewelry not found" });
    res.json(updatedJewelry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete jewelry by ID
exports.deleteJewelry = async (req, res) => {
  try {
    const deletedJewelry = await Jewelry.findOneAndDelete(req.params.id);
    if (!deletedJewelry)
      return res.status(404).json({ message: "Jewelry not found" });
    res.json({ message: "Jewelry deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
