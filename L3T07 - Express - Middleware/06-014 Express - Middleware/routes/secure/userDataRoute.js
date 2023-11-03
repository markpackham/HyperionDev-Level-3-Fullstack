// routes/userDataRoute.js
const { jwtMiddleware } = require("../../middleware/jwtMiddleware");
// get the userController's getTodos
const { getTodos } = require("../../controllers/userController");
const userDataRoute = (app) => {
  app.get("/login/data", jwtMiddleware, getTodos);
  //This route URL will be http://localhost:8080/login/data
};
// export the login function to be used in "../app.js"
module.exports = userDataRoute;
