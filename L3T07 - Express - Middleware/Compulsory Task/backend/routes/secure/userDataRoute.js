const { getTodos } = require("../../controllers/userController");
const { jwtMiddleware } = require("../../middleware/jwtMiddleware");
const userDataRoute = (app) => {
  app.get("/login/data", jwtMiddleware, getTodos);
};
module.exports = userDataRoute;
