const express = require("express");
// Express Router used to interact with CRUD functions
const router = express.Router();
const todoController = require("../../controllers/todos.controller");
const { jsonCheckMiddleware } = require("../../middleware/jsonCheckMiddleware");
const {
  todoTooLargeMiddleware,
} = require("../../middleware/todoTooLargeMiddleware");
const {
  tokenCheckMiddleware,
} = require("../../middleware/tokenCheckMiddleware");

// GET (default path)
// http://localhost:8080/todos/secure/
router.get("/secure/", todoController.findAll);

// POST
router.post(
  "/secure/add",
  [todoTooLargeMiddleware, jsonCheckMiddleware, tokenCheckMiddleware],
  todoController.create
);

// PUT
router.put(
  "/secure/update-todo/:todo_id",
  [todoTooLargeMiddleware, jsonCheckMiddleware, tokenCheckMiddleware],
  todoController.updateById
);

// DELETE
router.delete(
  "/secure/delete-todo/:todo_id",
  tokenCheckMiddleware,
  todoController.deleteById
);

module.exports = router;
