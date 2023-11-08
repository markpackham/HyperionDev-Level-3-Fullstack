// userController.js
// Require the user data from simulated database
const userInformation = require("./userDB");

const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const dotenv = require("dotenv");
dotenv.config();
const jwt_key = process.env.JWT_KEY;

// Define the login controller functions
exports.login = (req, res) => {
  User.find()
    .then((user) => {
      // Send users
      console.log(user);
    })
    .catch((err) => {
      // Error response
      console.log(err);
      res.status(500).send({
        message: "Error",
      });
    });

  console.log(usersList);

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

// Test I can find all users
exports.findAll = (req, res) => {
  res.status(200).send("Users found");
};

exports.register = async (req, res) => {
  try {
    const userModel = new User({
      username: req.body.username,
      password: req.body.password,
    });

    const saveUser = await userModel.save();
    console.log(saveUser);

    res.status(200).send("User added");
  } catch (error) {
    // Error response
    console.error(error);
    res.status(500).send({
      message: "Some error occurred while creating the todo.",
    });
  }
};
