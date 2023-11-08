const express = require("express");
// Express Router used to interact with CRUD functions
const router = express.Router();
const todoController = require("../../controllers/todos.controller");
const { jsonCheckMiddleware } = require("../../middleware/jsonCheckMiddleware");
const {
  todoTooLargeMiddleware,
} = require("../../middleware/todoTooLargeMiddleware");

// GET (default path)
// http://localhost:8080/todos
router.get("/secure/", todoController.findAll);

// POST
// /add
router.post(
  "/secure/add",
  [todoTooLargeMiddleware, jsonCheckMiddleware],
  todoController.create
);

// PUT
router.put(
  "/secure/update-todo/:todo_id",
  [todoTooLargeMiddleware, jsonCheckMiddleware],
  todoController.updateById
);

// DELETE
router.delete("/secure/delete-todo/:todo_id", todoController.deleteById);

module.exports = router;
