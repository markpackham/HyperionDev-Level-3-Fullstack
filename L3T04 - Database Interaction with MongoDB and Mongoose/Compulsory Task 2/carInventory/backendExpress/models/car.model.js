const mongoose = require("mongoose");

// Car model (handles business logic like in MVC)
const carSchema = mongoose.Schema({
  // We can use number rather than date since we are only dealing in years eg 2005
  Model: {
    type: Number,
    required: true,
  },
  Make: {
    type: String,
    required: true,
  },
  Owner: {
    type: String,
    required: true,
  },
  // All car registration numbers are unique so we can use that like a primary key
  // rather than the MongoDB Object _id which is hard to parse in Express
  // plus users would have an easier time keying in a car registration number Vs an Object id
  // when searching for something specific
  Registration: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Car", carSchema);
