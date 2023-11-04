// userController.js
// Require the user data from simulated database
const userInformation = require("../dummyDB/dummyDB");
const jwt = require("jsonwebtoken");

// Define the login controller functions
const userController = (req, res) => {
  //Get the username and password from the request query
  const { username, password } = req.query;
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
    name: username,
    admin: false,
  };
  // sign(payload, secretOrPrivateKey, [options, callback])
  const token = jwt.sign(JSON.stringify(payload), "HyperionDev", {
    algorithm: "HS256",
  });
  //The res.send() function sends a string to the client
  console.log(`User ${username} logged in`);
  res.send({ message: `Welcome back ${username}`, token: token });
};

// Define the user data controller function
const getTodos = (req, res) => {
  // extract username for the payload
  //const { name, admin } = req.body;
  console.log(req.payload);

  // Check for users if allowed to do CRUD - token needs to go to frontend
  if (req.payload != undefined) {
    const { name } = req.payload;
    console.log(name);

    // Find the user in the database - checking if the username and password matches
    const user = userInformation.find((user) => user.username === name);
    // If the user is found, return the user's todos
    if (user) {
      return res.send(user.todos);
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
