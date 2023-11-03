// controllers/userDB.js
const userInformation = [
  {
    id: 1,
    username: "user1",
    password: "password1",
    todos: ["eat", "sleep", "code"],
  },
  {
    id: 2,
    username: "user2",
    password: "password2",
    todos: ["By groceries", "Food the dog", "Make dinner"],
  },
  // ... other user data
];
// Export the userInformation array to be used in userController.js
module.exports = userInformation;
