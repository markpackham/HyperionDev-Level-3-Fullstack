// Connect to database using password in .env via dotenv module hidden by gitignore
const dotenv = require("dotenv");
dotenv.config();
const password = process.env.MONGODB_PASSWORD;

// Import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize express & use cors along with json handling middleware
const app = express();
app.use(cors());
app.use(express.json());

// Set up port for server to listen on
const PORT = process.env.PORT || 8080;

// Start up express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
