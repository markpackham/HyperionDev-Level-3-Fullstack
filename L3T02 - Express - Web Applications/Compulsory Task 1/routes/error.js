const express = require("express");
const path = require("path");

const error404Route = express.Router();

// Error code for any route we cannot find
error404Route.get("*", function (req, res) {
  let err = new Error("Page Not Found");

  if (res.status(404)) {
    console.log(err);
  }

  // Included "Sorry! Can’t find that resource. Please check your URL" in an html page
  // along with a link to get back home so it's more end user friendly
  res.sendFile(path.join(__dirname, "../public/404_error.html"));
});

module.exports = error404Route;
