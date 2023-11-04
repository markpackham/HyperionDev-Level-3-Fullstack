// routes/loginRoute.js
// get the userController
const { userController } = require("../controllers/userController");
const loginRoute = (app) => {
  app.post("/login", userController);
  //This route URL will be http://localhost:8080/login
};
// export the login function to be used in "../app.js"
module.exports = loginRoute;
