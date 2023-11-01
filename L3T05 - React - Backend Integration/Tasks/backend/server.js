const express = require("express");
const cors = require("cors");
const app = express();
// Define the port number for the server
const PORT = process.env.PORT || 5000;
// Enable Cross-Origin Resource Sharing
app.use(cors());
// Define the route to retrieve the message
app.get("/api/data", (req, res) => {
  const data = { message: "Hello from the back end!" };
  // Send data as a response
  res.json(data);
});

const customMessage = "Hi there I am a custom message!";

// Send a custom message if all is well due to an http 200
app.get("/api/message", function (req, res) {
  if (res.status(200)) {
    res.send(`${customMessage}`);
  } else {
    // Throw out an error message
    // Error handling (no date) Express error handling.
    // Available at: https://expressjs.com/en/guide/error-handling.html (Accessed: 01 November 2023).
    const err = new Error("Custom message not found");
    next(err);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
