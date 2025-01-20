const Orders = require("../models/ordersModel");

// Controller method for creating Orders (handling Base64 images)
exports.createOrders = async (req, res) => {
  // Extract image data and other Orders fields from the body
  const {
    orderId,
    orderTime,
    userId,
    customerName,
    paymentMethod,
    totalAmount,
    utrNumber,
    utrStatus,
    orderStatus,
    shippingDetails,
    items,
  } = req.body;

  // Create a new Orders item
  const orders = new Orders({
    orderId,
    orderTime,
    userId,
    customerName,
    paymentMethod,
    totalAmount,
    utrNumber,
    utrStatus,
    orderStatus,
    shippingDetails,
    items,
  });

  try {
    // Save the Orders item to the database
    const newOrder = await orders.save();
    res.status(201).json(newOrder); // Respond with the newly created orders
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Orders items
exports.getAllOrders = async (req, res) => {
  try {
    const orderItems = await Orders.find();
    res.json(orderItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Orders by ID
exports.getOrdersById = async (req, res) => {
  try {
    const orders = await Orders.findOne({ id: req.params.id });
    if (!orders) return res.status(404).json({ message: "Orders not found" });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Orders by User ID
exports.getOrdersById = async (req, res) => {
  try {
    const orders = await Orders.find({ id: req.params.userId });
    if (!orders) return res.status(404).json({ message: "Orders not found" });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Orders by ID
exports.updateOrders = async (req, res) => {
  try {
    const updatedOrders = await Orders.findOneAndUpdate(
      { id: req.params.orderId }, // Query by productId
      req.body,
      { new: true } // Return the updated document
    );
    if (!updatedOrders)
      return res.status(404).json({ message: "Orders not found" });
    res.json(updatedOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete orders by ID
exports.deleteOrders = async (req, res) => {
  try {
    const deletedOrders = await Orders.findOneAndDelete(req.params.id);
    if (!deletedOrders)
      return res.status(404).json({ message: "Orders not found" });
    res.json({ message: "Orders deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
