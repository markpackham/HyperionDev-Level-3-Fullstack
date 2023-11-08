const express = require("express");
// Express Router used to interact with CRUD functions
const router = express.Router();
const todoController = require("../../controllers/todos.controller");
const {
  todoTooLargeMiddleware,
} = require("../../middleware/todoTooLarge.Middleware");

// GET (default path)
// http://localhost:8080/todos
router.get("/secure/", todoController.findAll);

// POST
// /add
router.post("/secure/add", todoTooLargeMiddleware, todoController.create);

// PUT
// /update-todo/123
router.put("/secure/update-todo/:todo_id", todoController.updateById);

// DELETE
// /delete-todo/ZZZ111
router.delete("/secure/delete-todo/:todo_id", todoController.deleteById);

module.exports = router;
