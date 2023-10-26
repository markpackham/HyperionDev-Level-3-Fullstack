const express = require("express");
const app = express();

// Either use the environment variable for Port or Port 3000 if there isn't one
// http://localhost:3000/about
const port = process.env.PORT || 3000;

// Make sure I am using Port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use(express.static("public"));

app.get("/about", function (req, res) {
  res.send("Hello World!");
});
