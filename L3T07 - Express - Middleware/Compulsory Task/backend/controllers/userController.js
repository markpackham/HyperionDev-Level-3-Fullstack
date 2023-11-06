const dotenv = require("dotenv");
dotenv.config();
const jwt_key = process.env.JWT_KEY;

// Require databases & jwt
const userInformation = require("../dummyDB/dummyUserDB");
const todoInformation = require("../dummyDB/dummyTodoDB");
const jwt = require("jsonwebtoken");

// Define the login controller functions
const userController = (req, res) => {
  //Get the username and password from the request query
  const { username, password } = req.body;

  //Find the user in the database - returns a boolean
  const user = userInformation.find(
    (user) => user.username === username && user.password === password
  );
  //If the user is not found, return an error message - end the request
  if (!user) {
    return res.send("Incorrect user credentials");
  }
  // Create a JWT token - payload
  payload = {
    username: username,
  };
  // sign(payload, secretOrPrivateKey, [options, callback])
  const token = jwt.sign(JSON.stringify(payload), jwt_key, {
    algorithm: "HS256",
  });
  //The res.send() function sends a string to the client
  console.log(`User ${username} logged in`);
  res.send({ message: `Welcome back ${username}`, token: token });
};

// Define the user data controller function
const getTodos = (req, res) => {
  // extract username for the payload
  console.log(req.payload);

  // Check for users if allowed to do CRUD - token needs to go to frontend
  if (req.payload != undefined) {
    const { username } = req.payload;
    console.log(username);

    // Find the user in the database - checking if the username and password matches
    const user = userInformation.find((user) => user.username === username);
    // If the user is found, return the todos
    if (user) {
      return res.send(todoInformation);
    }
  } else {
    res.send("User not found.");
  }
};
//export controller functions to be used on the myLoggerRoute.js/routes
module.exports = {
  userController,
  getTodos,
};
