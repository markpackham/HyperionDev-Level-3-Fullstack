const mongoose = require('mongoose');

// Initialize our schema
const carSchema = mongoose.Schema({
  Model: {
    // Sets the data type of the title field to be a string
    type: Number,
    // Sets the title field to be required
    required: true
  },
  Make: {
    type: String,
    required: true
  },
  Owner: {
    type: String,
    required: true
  },
  Registration: {
    type: String,
    required: true
  },
  Address: {
    type: String,
    required: true
  },
});


module.exports = mongoose.model('Car', carSchema);
