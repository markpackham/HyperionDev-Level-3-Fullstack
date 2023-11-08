// userController.js
// Require the user data from simulated database
const userInformation = require("./userDB");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();
const jwt_key = process.env.JWT_KEY;

// Define the login controller functions
exports.login = (req, res) => {
  //Get the username and password from the request query
  const { username, password } = req.body;

  //Find the user in the database
  const user = userInformation.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return res.send("Incorrect user credentials");
  }
  // Create a JWT token - payload
  payload = {
    name: username,
  };
  // sign(payload, secretOrPrivateKey, [options, callback])
  const token = jwt.sign(JSON.stringify(payload), jwt_key, {
    algorithm: "HS256",
  });
  //The res.send() function sends a string to the client
  res.send({
    message: `Welcome back ${username} please go Home to add todos!`,
    token: token,
  });
};

exports.register = (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  console.log(password);
};
