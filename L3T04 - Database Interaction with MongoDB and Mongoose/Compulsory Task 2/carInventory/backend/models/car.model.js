const mongoose = require('mongoose');

// Car model
const carSchema = mongoose.Schema({
  // We can use number rather than date since we are only dealing in years eg 2005
  Model: {
    type: Number,
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
