const dotenv = require("dotenv");
dotenv.config();
const jwt_key = process.env.JWT_KEY;

// Require databases & jwt
const userInformation = require("../dummyDB/dummyUserDB");
const todoInformation = require("../dummyDB/dummyTodoDB");
const jwt = require("jsonwebtoken");

// Regular Expression for @gmail.com
const emailRegex = /@gmail.com$/;

// Define the login controller functions
const userController = (req, res) => {
  //Get the username and password from the request query
  const { username, password } = req.body;

  // Check username ends with @gmail.com
  // if not throw out a 403
  if (!emailRegex.test(username)) {
    return res.status(403).send({ message: `403 Error!` });
  }

  //Find the user in the database - returns a boolean
  const user = userInformation.find(
    (user) => user.username === username && user.password === password
  );
  //If the user is not found, return an error message - end the request
  if (!user) {
    return res.status(401).send({ message: "Incorrect user credentials" });
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

// Create todo
exports.create = async (req, res) => {
  try {
    const todoModel = new Todo({
      todo_id: req.body.todo_id,
      todo_name: req.body.todo_id,
      todo_description: req.body.todo_description,
    });

    // Save the new todo in the database
    const saveTodo = await todoModel.save();

    // Success response
    console.log(saveTodo);
    res.send("The todo has been added");
  } catch (error) {
    // Error response
    console.error(error);
    res.status(500).send({
      message: "Some error occurred while creating the todo.",
    });
  }
};

//export controller functions to be used on the myLoggerRoute.js/routes
module.exports = {
  userController,
  getTodos,
};
