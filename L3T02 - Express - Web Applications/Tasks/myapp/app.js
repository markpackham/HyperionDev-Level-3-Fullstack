const express = require("express");
const app = express();
// Use the public folder for stuff we want users to see like "hello.html"
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.send("Hello World!");
});

// Show environment variables if we have any
// OBVIOUSLY never do this on a real site for security reasons
// console.log("The value of process.env is:", process.env);

// Show port being used
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
