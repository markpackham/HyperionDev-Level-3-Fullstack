const express = require("express");
// Express Router used to interact with CRUD functions
const router = express.Router();
const { register } = require("../controllers/userController");

router.post("/register", register);

module.exports = router;
