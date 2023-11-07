const express = require("express");
// Express Router used to interact with CRUD functions
const router = express.Router();
const { userController } = require("../controllers/userController");

//http://localhost:8080/todos/login
router.post("/login", userController.login);

module.exports = router;
