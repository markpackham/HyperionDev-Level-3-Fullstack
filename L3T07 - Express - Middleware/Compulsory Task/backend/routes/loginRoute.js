const { userController } = require("../controllers/userController");
const loginRoute = (app) => {
  //Route http://localhost:8080/login
  app.post("/login", userController);
};
module.exports = loginRoute;
