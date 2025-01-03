const Jewelry = require("../models/jewelryModel");

// Create a new jewelry item
exports.createJewelry = async (req, res) => {
  const {
    title,
    image,
    price,
    description,
    collection,
    category,
    wishList,
    addToCart,
    stock,
  } = req.body;
  const jewelry = new Jewelry({
    title,
    image,
    price,
    description,
    collection,
    category,
    wishList,
    addToCart,
    stock,
  });

  try {
    const newJewelry = await jewelry.save();
    res.status(201).json(newJewelry);
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
    const deletedJewelry = await Jewelry.findByIdAndDelete(req.params.id);
    if (!deletedJewelry)
      return res.status(404).json({ message: "Jewelry not found" });
    res.json({ message: "Jewelry deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
