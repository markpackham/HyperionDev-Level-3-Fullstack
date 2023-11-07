const { createTodo, getTodos } = require("../../controllers/userController");
const { jwtMiddleware } = require("../../middleware/jwtMiddleware");
const userDataRoute = (app) => {
  app.get("/login/data", jwtMiddleware, getTodos);

  app.post("/add", createTodo);
};
module.exports = userDataRoute;
