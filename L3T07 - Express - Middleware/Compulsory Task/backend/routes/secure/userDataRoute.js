const { getTodos } = require("../../controllers/userController");
const { jwtMiddleware } = require("../../middleware/jwtMiddleware");
const userDataRoute = (app) => {
  app.post("/login/data", jwtMiddleware, getTodos);
};
module.exports = userDataRoute;
