// db.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // This loads variables from the .env file

const dbURI = process.env.MONGODB_URI; // Use the environment variable for the MongoDB URI

const connectToDatabase = async () => {
  if (!dbURI) {
    console.error("MongoDB URI is not defined in the .env file!");
    process.exit(1); // Exit process if MongoDB URI is not found
  }

  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectToDatabase;
