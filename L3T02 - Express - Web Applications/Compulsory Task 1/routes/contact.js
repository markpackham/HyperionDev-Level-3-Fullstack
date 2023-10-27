const express = require("express");
const path = require("path");

const contactRoute = express.Router();

contactRoute.get("/contact_us", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/contact_us.html"));
});

module.exports = contactRoute;
