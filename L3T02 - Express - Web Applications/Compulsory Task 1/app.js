const express = require("express");
// File System - needed to read and write the person.json file
const fs = require("fs");
const path = require("path");
const app = express();

// Either use the environment variable for Port or Port 3000 if there isn't one
// http://localhost:3000/about
const PORT = process.env.PORT || 3000;

// Make sure I am using Port 3000
app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(express.static("public"));

// Utility function - gets person data, and creates the file if it doesn't exist
function getPeople() {
  try {
    const content = fs.readFileSync("people.json");
    return JSON.parse(content);
  } catch (e) {
    // File non-existent
    fs.writeFileSync("people.json", "[]");
    return [];
  }
}

app.get("/", function (req, res) {
  const people = getPeople();
  if (people) {
    res.send("Can confirm person exists");
  } else {
    res.send("There is no one to welcome");
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
