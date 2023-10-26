const express = require("express");
const app = express();
// Use the public folder for stuff we want users to see like "hello.html"
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.send("Hello World!");
});
app.listen(8000, function () {
  console.log("Example app listening on port 8000!");
});
