const express = require("express");
const getPerson = require("../helpers/person");

// Express router used
const homeRoute = express.Router();

homeRoute.get("/", function (req, res) {
  const person = getPerson();
  // Make sure we have a person with a name
  if (person.name.length > 0) {
    const name = person.name;
    res.send(`<h1>Welcome ${name}</h1>`);
  } else {
    res.send("<h1>There is no one to welcome</h1>");
  }
});

module.exports = homeRoute;
