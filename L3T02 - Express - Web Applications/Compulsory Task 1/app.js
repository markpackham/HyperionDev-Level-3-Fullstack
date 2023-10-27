const express = require("express");
const path = require("path");
// Keep helper functions out of my Express script
const getPerson = require("./helpers/person");
const errorHandler = require("./helpers/errors");

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

app.get("/", function (req, res) {
  const person = getPerson();
  // Make sure we have a person with a name
  if (person.name.length > 0) {
    const name = person.name;
    res.send(`<h1>Welcome ${name}</h1>`);
  } else {
    res.send("<h1>There is no one to welcome</h1>");
  }
});

// Learned to use sendFile to get Html files from
//262588213843476 (no date) ! .gitignore for Express App, Gist. Available at: https://gist.github.com/dphurley/182ddab5a2482fbdda2de3b09bff446a (Accessed: 26 October 2023).
//Sev, C. (2021) How to deliver HTML files with Express, DigitalOcean.
// Available at: https://www.digitalocean.com/community/tutorials/use-expressjs-to-deliver-html-files (Accessed: 26 October 2023).

app.get("/about", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/about.html"));
});

app.get("/contact_us", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/contact_us.html"));
});

// Error code for any route we cannot find
app.get("*", function (req, res) {
  let err = new Error("Page Not Found");
  err.statusCode = 404;
  // Notify myself of the 404 error but avoid the end user being scared off
  // by all the sensitive error data on my site
  console.log(err);

  // Included "Sorry! Can’t find that resource. Please check your URL" in an html page
  // along with a link to get back home so it's more end user friendly
  res.sendFile(path.join(__dirname, "/public/404_error.html"));
});
