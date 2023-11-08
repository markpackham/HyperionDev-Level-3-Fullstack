const express = require("express");
// Express Router used to interact with CRUD functions
const router = express.Router();
const { register } = require("../controllers/userController");
const { checkEmailMiddleware } = require("../middleware/checkEmailMiddleware");

router.post("/register", checkEmailMiddleware, register);

module.exports = router;
