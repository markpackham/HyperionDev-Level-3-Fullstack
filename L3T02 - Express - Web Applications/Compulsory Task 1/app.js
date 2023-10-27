const express = require("express");
// Keep helper functions out of my Express script
const errorHandler = require("./helpers/errors");
const homeRoute = require("./routes/home");
const aboutRoute = require("./routes/about");
const contactRoute = require("./routes/contact");
const error404Route = require("./routes/error");

const app = express();

// Either use the environment variable for Port or Port 3000 if there isn't one
// http://localhost:3000/about
const PORT = process.env.PORT || 3000;

// Make sure I am using Port 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Public facing static content
app.use(express.static("public"));

// Middleware for Http 500 errors that will take effect on all routes
app.use(errorHandler);

// Use all routes in separate files
app.use(homeRoute);
app.use(aboutRoute);
app.use(contactRoute);
app.use(error404Route);
