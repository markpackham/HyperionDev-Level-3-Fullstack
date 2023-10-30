const Car = require('../models/car.model');

exports.create = async (req, res) => {
    try {
        // Create a new car
        const carModel = new Car({
            Model: 2020,
            Make: 'Flying Car',
            Owner: 'Neil Jameson',
            Registration: 'ZZZ111',
            Address: '11 Park Lane, London England',
        });

        // Save the new car
    const saveCar = await carModel.save();

    // Success response
    console.log(saveCar);
    res.send('The car has been added');
} catch (error) {
    // Error response
    console.error(error);
    res.status(500).send({
        message: "Some error occurred while creating the car."
    });
    }
};

exports.findAll = (req, res) => {
    // Use the "find" method to return all cars
    console.log(req.params);
    Car.find()
        .then(cars => {
            // Send the retrieved cars as a success response
            res.send(cars);
        })
        .catch(err => {
            // Error response
            console.log(err);
            res.status(500).send({
                message: "An error occurred while retrieving cars"
            });
        });
};

exports.findOlderThan5Years = (req, res) => {
    // Use the "find" method to return all cars
    Car.find({ Model: { $lt: 2018 } })
        .then(cars => {
            // Send the retrieved cars as a success response
            res.send(cars);
        })
        .catch(err => {
            // Error response
            console.log(err);
            res.status(500).send({
                message: "An error occurred while retrieving cars"
            });
        });
};



exports.updateByReg = async (req, res) => {
    try {
        // Grab specific car to update by reg
        const reg = req.params.reg;

        // Define the new data to update the owner
        const update = { Owner: 'Richard Liverpool' };

        /* Use the "findOneAndUpdate" method to update a car with the
        specified reg and set the "new" option to true to get the
        updated document as the result */
        // The find part requires an object rather than a string
        const updatedCar = await Car.findOneAndUpdate({Registration: reg}, update, { new: true });

        if (updatedCar) {
            res.send("Updated successfully");
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


