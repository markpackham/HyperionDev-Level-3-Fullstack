const express = require("express");
// Express Router used to interact with CRUD functions
const router = express.Router();
const { login } = require("../controllers/userController");

router.post("/login", login);

module.exports = router;
