const express = require("express");
const app = express();

// Handle json via Express middleware and not body-parser
app.use(express.json());

// Global error handler middleware
// ensures that server doesn't crash on unhandled exceptions
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// import the login route
const loginRoute = require("./routes/loginRoute.js");

// import the myLoggerRoute
const myLoggerRoute = require("./routes/myLoggerRoute");

// import the secure userData route
const userDataRoute = require("./routes/secure/userDataRoute");
userDataRoute(app);

// Step 1: call the myLoggerRoute function and pass in the app object as an argument
loginRoute(app);
myLoggerRoute(app);
// ==> From here go to routes/myLoggerRoute.js

//Listening on port 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// The server will run on port 8080 / http://localhost:8080

/*
 ** Getting started: Installation
 ** Step 1: Open the current directory in your terminal
 ** Step 2: Run the command: npm install
 ** Step 3: Run the command: npm start
 */
