// File System - needed to read and write the person.json file
const fs = require("fs");

// Utility function - gets person data, and creates the file if it doesn't exist
const getPerson = () => {
  try {
    const content = fs.readFileSync("person.json");
    return JSON.parse(content);
  } catch (e) {
    fs.writeFileSync("person.json", "[]");
    return [];
  }
};

module.exports = getPerson;
