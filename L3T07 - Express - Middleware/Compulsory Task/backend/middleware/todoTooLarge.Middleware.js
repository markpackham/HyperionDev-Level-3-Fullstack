const todoTooLargeMiddleware = (req, res, next) => {

    const todo_description = "";

    if (todo_description.length > 140)) {
        return res.status(400).send("Todo description is far too long");
      }

  next();
};

module.exports = { todoTooLargeMiddleware };
