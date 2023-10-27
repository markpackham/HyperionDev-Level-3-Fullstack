const express = require("express");
const path = require("path");

// Learned to use sendFile to get Html files from
//262588213843476 (no date) ! .gitignore for Express App, Gist. Available at: https://gist.github.com/dphurley/182ddab5a2482fbdda2de3b09bff446a (Accessed: 26 October 2023).
//Sev, C. (2021) How to deliver HTML files with Express, DigitalOcean.
// Available at: https://www.digitalocean.com/community/tutorials/use-expressjs-to-deliver-html-files (Accessed: 26 October 2023).

const aboutRoute = express.Router();

aboutRoute.get("/about", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/about.html"));
});

module.exports = aboutRoute;
