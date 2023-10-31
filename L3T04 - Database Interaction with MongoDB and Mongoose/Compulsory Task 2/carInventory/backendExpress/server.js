// Connect to database using password in .env via dotenv module hidden by gitignore
const dotenv = require("dotenv");
dotenv.config();
const password = process.env.MONGODB_PASSWORD;

// Import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Handle Cors errors when I have both React & Express running
// Cors (no date) Express cors middleware.
//Available at: https://expressjs.com/en/resources/middleware/cors.html (Accessed: 30 October 2023).
const cors = require("cors");

// Import routes
const getCars = require("./routes/getCars");

// Initialize express & use cors
const app = express();
app.use(cors());

// Set up port for server to listen on
const PORT = process.env.PORT || 8080;

// ! [IMPORTANT]: Replace with your mongoDB URI string. You can get it from your Atlas cluster.
const uri = `mongodb+srv://graveofmine99:${password}@hyperiondevlearning.dpl6f6p.mongodb.net/?retryWrites=true&w=majority`;

// Connect to the database
mongoose.Promise = global.Promise;
mongoose.connect(uri, { useNewUrlParser: true }).then(
  () => {
    console.log("Successfully connected to the database!");
  },
  (err) => {
    console.log("Could not connect to the database..." + err);
  }
);

// Allow app to accept json and url encoded values
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up routes to be handled from: http://localhost:8080/cars
app.use("/cars", getCars);

// Start up express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
