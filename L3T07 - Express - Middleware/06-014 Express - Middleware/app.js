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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
