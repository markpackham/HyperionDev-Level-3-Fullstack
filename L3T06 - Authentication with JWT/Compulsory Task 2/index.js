const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 8000;

// Allows us to parse the body of a request
app.use(bodyParser.json());

// User login
// POST
// http://localhost:8000/login
app.post("/login", (req, res) => {
  console.log(req.body);

  // Req.body is sent by the client
  // destruct values instead of const pwd = req.body.password
  const { username } = req.body;
  const { password } = req.body;

  if (username === "zama" && password === "secret") {
    // Make JWT and chose if user has admin access based on true/false
    payload = {
      name: username,
      admin: true,
    };
    // Create JMT
    const token = jwt.sign(JSON.stringify(payload), "jwt-secret", {
      algorithm: "HS256",
    });
    res.send({ token: token });
  } else {
    res.status(403).send({ err: "Incorrect login!" });
  }
});

// Resource endpoint
// http://localhost:8000/resource
// checks the JWT in the auth header and displays a message with the username.
app.get("/resource", (req, res) => {
  const auth = req.headers["authorization"];
  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "jwt-secret");
    res.send({
      msg: `Hello, ${decoded.name}! Your JSON Web Token has been verified.`,
    });
  } catch (err) {
    res.status(401).send({ err: "Bad JWT!" });
  }
});

// Admin Only Section
// checks the JWT and displays a message if the token
// is verified and the token holder is an admin.
app.get("/admin_resource", (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  try {
    const decoded = jwt.verify(token, "jwt-secret");
    // Check if they are an admin
    if (decoded.admin) {
      res.send({ msg: `Success! Welcome admin ${decoded.name}` });
    } else {
      res.status(403).send({
        msg: `Your JWT was verified ${decoded.name}, but you are not an admin.`,
      });
    }
  } catch (e) {
    res.sendStatus(401);
  }
});

// Start the server
app.listen(PORT, () =>
  console.log(`Now listening at http://localhost:${PORT}`)
);
