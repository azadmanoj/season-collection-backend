const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    userId: { type: String, unique: true },
    id: { type: String, default: () => uuidv4(), unique: true },
    addToCart: { type: [String], default: [] },
    wishList: { type: [String], default: [] },
    orders: [
      {
        orderId: { type: String, default: () => uuidv4() },
        items: [{ type: Object }],
        totalAmount: { type: Number },
        shippingDetails: { type: Object },
        paymentMethod: { type: String },
        utrNumber: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// Pre-save middleware to generate userId and set firstName
userSchema.pre("save", function (next) {
  if (this.isNew) {
    // Generate a 4-digit UUID (just the first part of the UUID)
    const uuid = uuidv4().split("-")[0]; // Get the first part of the UUID
    this.userId = `${this.firstName.slice(0, 3)}-${uuid.slice(0, 4)}`; // Combine first name and UUID part

    // Ensure firstName is extracted properly (if it's not already set)
    if (!this.firstName) {
      this.firstName = this.name ? this.name.split(" ")[0] : "Unknown";
    }
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
