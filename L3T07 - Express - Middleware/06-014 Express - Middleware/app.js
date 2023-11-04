const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import routes
const myLoggerRoute = require("./routes/myLoggerRoute");
const loginRoute = require("./routes/loginRoute.js");
const userDataRoute = require("./routes/secure/userDataRoute");

myLoggerRoute(app);
loginRoute(app);
userDataRoute(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
