const express = require("express");
// Express Router used to interact with CRUD functions
const router = express.Router();
const todoController = require("../controllers/todos.controller");

// GET (default path)
// http://localhost:8080/todos
router.get("/", todoController.findAll);

// POST
// /add
router.post("/add", todoController.create);

// PUT
// /update-todo/123
router.put("/update-todo/:todo_id", todoController.updateById);

// DELETE
// /delete-todo/ZZZ111
router.delete("/delete-todo/:todo_id", todoController.deleteById);

module.exports = router;
