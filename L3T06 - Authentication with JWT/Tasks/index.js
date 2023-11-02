const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 8000;
// Allows us to parse the body of a request
app.use(bodyParser.json());
// User login
// http://localhost:8000/login
app.post("/login", (req, res) => {
  // Req.body is sent by the client
  const usr = req.body.username;
  const pwd = req.body.password;
});
// Start the server
app.listen(PORT, () =>
  console.log(`Now listening at http://localhost:${PORT}`)
);
