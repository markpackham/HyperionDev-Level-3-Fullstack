// routes/loginRoute.js
// get the userController
const { getTodos } = require("../../controllers/userController");
const { jwtMiddleware } = require("../../middleware/jwtMiddleware");
const userDataRoute = (app) => {
  app.post("/login/data", jwtMiddleware, getTodos);
  //This route URL will be http://localhost:8080/login
};
// export the login function to be used in "../app.js"
module.exports = userDataRoute;
