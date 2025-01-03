const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jewelryRoutes = require("./routes/jewelryRoutes");
const authRoutes = require("./routes/authRoutes");
const config = require("./lib/mongodb");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
dotenv.config(); // This loads variables from the .env file

const dbURI = process.env.MONGODB_URI;

const app = express();
const port = process.env.PORT || 9000;

app.use(cors()); // Enable CORS for all routes
app.use(helmet()); // Use helmet for added security (optional)

// Middleware to parse JSON
app.use(bodyParser.json());

// Error handling for malformed JSON (optional)
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({ message: "Invalid JSON format" });
  }
  next();
});

// Routes
app.use("/api/jewelry", jewelryRoutes);

app.use("/api/auth", authRoutes);
// MongoDB Connection
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit process if DB connection fails
  });

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
