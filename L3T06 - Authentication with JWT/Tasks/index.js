const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 8000;

// Allows us to parse the body of a request
app.use(bodyParser.json());

// User login
// http://localhost:8000/login
app.post("/login", (req, res) => {
  console.log(req.body);
  // Req.body is sent by the client
  const usr = req.body.username;
  const pwd = req.body.password;
  //res.send(`Username: ${usr}, Password: ${pwd}`);

  if (usr === "zama" && pwd === "secret") {
    // To-do
  } else {
    res.status(403).send({ err: "Incorrect login!" });
  }
});

// Start the server
app.listen(PORT, () =>
  console.log(`Now listening at http://localhost:${PORT}`)
);
