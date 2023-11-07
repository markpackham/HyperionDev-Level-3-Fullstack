const Car = require("../models/todo.model");

exports.create = async (req, res) => {
  try {
    const todoModel = new Todo({
      todo_id: req.body.todo_id,
      todo_name: req.body.todo_name,
      todo_description: req.body.todo_description,
    });

    const saveTodo = await todoModel.save();

    // Success response
    console.log(saveTodo);
    res.send("The save has been added");
  } catch (error) {
    // Error response
    console.error(error);
    res.status(500).send({
      message: "Some error occurred while creating the todo.",
    });
  }
};

exports.findAll = (req, res) => {
  console.log(req.params);
  Todo.find()
    .then((todos) => {
      res.send(todos);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "An error occurred while retrieving todos",
      });
    });
};

exports.updateById = async (req, res) => {
  try {
    // Grab specific todo to update by id
    const reg = req.params.todo_id;

    // Define the new data to update
    const update = {
      todo_id: req.body.todo_id,
      todo_name: req.body.todo_name,
      todo_description: req.body.todo_description,
    };

    const updatedTodo = await Todo.findOneAndUpdate(
      { todo_id: todo_id },
      update,
      { new: true }
    );

    if (updatedTodo) {
      res.status(200);
    } else {
      res.status(404).send("Todo not found");
    }
  } catch (error) {
    console.error("Something went wrong when updating data.", error);
    res.status(500).send("An error occurred while updating.");
  }
};

exports.deleteById = async (req, res) => {
  try {
    const todo_id = req.params.reg;
    // Remove a car with the specified reg gained from the url sent ":reg"
    const deleteResult = await Car.deleteOne({ todo_id: todo_id });

    if (deleteResult.deletedCount > 0) {
      res.send("Successfully deleted the todo.");
    } else {
      res.send("Todo not found...");
    }
  } catch (error) {
    console.error("An error occurred while removing the todo.", error);
    res.status(500).send("An error occurred while removing the todo.");
  }
};
