// routes/loginRoute.js
// get the userController's getTodos
const { getTodos } = require("../../controllers/userController");
const userDataRoute = (app) => {
  app.get("/login/data", getTodos);
  //This route URL will be http://localhost:8080/login/data
};
// export the login function to be used in "../app.js"
module.exports = userDataRoute;
