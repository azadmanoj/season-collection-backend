const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Import the uuid library

// Define the Jewelry schema
const jewelrySchema = new mongoose.Schema(
  {
    id: { type: String, default: () => uuidv4(), unique: true },
    title: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String, required: true },
    collection: { type: String },
    wishList: { type: Boolean },
    status: { type: String },
    published: { type: Boolean },
    addToCart: { type: Boolean },
    stock: { type: Number, default: 1 },

    reviews: [
      {
        name: { type: String, required: true },
        text: { type: String, required: true },
        stars: { type: Number, min: 1, max: 5, required: true },
        date: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

// Export the Jewelry model
module.exports = mongoose.model("Jewelry", jewelrySchema);
