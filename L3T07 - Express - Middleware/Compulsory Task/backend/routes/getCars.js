const express = require("express");
// Express Router used to interact with CRUD functions
const router = express.Router();
const todoController = require("../controllers/todos.controller");

// POST
// eg http://localhost:8080/todos/add
router.post("/add", todoController.create);

// GET
// http://localhost:8080/todos
router.get("/", todoController.findAll);

// PUT
// http://localhost:8080/todos/update-todo/123
router.put("/update-todo/:id", todoController.updateById);

// DELETE
// http://localhost:8080/todos/delete-todo/ZZZ111
router.delete("/delete-todo/:id", todoController.deleteById);

module.exports = router;
