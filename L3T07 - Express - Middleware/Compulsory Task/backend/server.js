// Connect to database using password in .env via dotenv module hidden by gitignore
const dotenv = require("dotenv");
dotenv.config();
const password = process.env.MONGODB_PASSWORD;
const uri = `mongodb+srv://graveofmine99:${password}@hyperiondevlearning.dpl6f6p.mongodb.net/?retryWrites=true&w=majority`;

// Import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize express & use cors along with json handling middleware
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

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

// Import routes
const loginRoute = require("./routes/loginRoute.js");
const userDataRoute = require("./routes/secure/userDataRoute");
loginRoute(app);
userDataRoute(app);

// Set up port for server to listen on
const PORT = process.env.PORT || 8080;

// Start up express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
