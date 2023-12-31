const Car = require("../models/car.model");

exports.create = async (req, res) => {
  try {
    // Create a new car, use params submitted from user's POST based off Car model
    const carModel = new Car({
      Model: req.body.Model,
      Make: req.body.Make,
      Owner: req.body.Owner,
      Registration: req.body.Registration,
      Address: req.body.Address,
    });

    // Save the new car in the database
    const saveCar = await carModel.save();

    // Success response
    console.log(saveCar);
    res.send("The car has been added");
  } catch (error) {
    // Error response
    console.error(error);
    res.status(500).send({
      message: "Some error occurred while creating the car.",
    });
  }
};

exports.findAll = (req, res) => {
  // Use the "find" method to return all cars
  console.log(req.params);
  Car.find()
    .then((cars) => {
      // Send the retrieved cars as a success response
      res.send(cars);
    })
    .catch((err) => {
      // Error response
      console.log(err);
      res.status(500).send({
        message: "An error occurred while retrieving cars",
      });
    });
};

exports.findOlderThan5Years = (req, res) => {
  // Take the current year and minus 5
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear() - 5;

  // Use the "find" method to return all cars
  // to find old cars check if Model year is less than current year minus 5
  Car.find({ Model: { $lt: currentYear } })
    .then((cars) => {
      // Send the retrieved cars as a success response
      res.send(cars);
    })
    .catch((err) => {
      // Error response
      console.log(err);
      res.status(500).send({
        message: "An error occurred while retrieving cars",
      });
    });
};

exports.updateByReg = async (req, res) => {
  try {
    // Grab specific car to update by reg
    const reg = req.params.reg;

    // Define the new data to update
    const update = {
      Model: req.body.Model,
      Make: req.body.Make,
      Owner: req.body.Owner,
      Registration: req.body.Registration,
      Address: req.body.Address,
    };

    /* Use the "findOneAndUpdate" method to update a car with the
        specified reg and set the "new" option to true to get the
        updated document as the result */
    // The find part requires an object rather than a string
    const updatedCar = await Car.findOneAndUpdate(
      { Registration: reg },
      update,
      { new: true }
    );

    if (updatedCar) {
      res.status(200);
    } else {
      res.status(404).send("Car not found");
    }
  } catch (error) {
    console.error("Something went wrong when updating data.", error);
    res.status(500).send("An error occurred while updating.");
  }
};

// While registrations are unique an owner can have multiple cars
exports.updateByOwner = async (req, res) => {
  try {
    // Grab specific cars to update by owner and every single car with the owner
    // name gets changed
    const owner = req.params.owner;

    const update = {
      Model: req.body.Model,
      Make: req.body.Make,
      Owner: req.body.Owner,
      Registration: req.body.Registration,
      Address: req.body.Address,
    };

    // Use update many
    // https://www.mongodb.com/docs/manual/reference/method/db.collection.updateMany/
    const updatedCars = await Car.updateMany({ Owner: owner }, update);

    if (updatedCars) {
      res.status(200);
    } else {
      res.status(404).send("Car not found");
    }
  } catch (error) {
    console.error("Something went wrong when updating data.", error);
    res.status(500).send("An error occurred while updating.");
  }
};

exports.deleteByReg = async (req, res) => {
  try {
    const reg = req.params.reg;
    // Remove a car with the specified reg gained from the url sent ":reg"
    const deleteResult = await Car.deleteOne({ Registration: reg });

    if (deleteResult.deletedCount > 0) {
      res.send("Successfully deleted the car.");
    } else {
      res.send("Car not found...");
    }
  } catch (error) {
    console.error("An error occurred while removing car.", error);
    res.status(500).send("An error occurred while removing car.");
  }
};
