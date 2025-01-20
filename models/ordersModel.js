const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const ordersSchema = new mongoose.Schema(
  {
    orderId: { type: String, default: () => uuidv4() },
    userId: { type: String },
    orderTime: { type: Date, default: Date.now },
    customerName: { type: String },
    paymentMethod: { type: String },
    totalAmount: { type: Number },
    utrNumber: { type: String },
    utrStatus: { type: String },
    orderStatus: { type: String },
    items: [{ type: Object }],
  },
  { timestamps: true }
);

// Export the Jewelry model
module.exports = mongoose.model("Orders", ordersSchema);
