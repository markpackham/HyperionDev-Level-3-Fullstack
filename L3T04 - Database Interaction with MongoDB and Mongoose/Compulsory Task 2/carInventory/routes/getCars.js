const express = require('express');
// Express Router used to interact with CRUD functions
const router = express.Router();
const carController = require('../controllers/cars.controller');

// Create a new car
router.post('/add', carController.create);

// Get all cars
router.get('/', carController.findAll);

// Update a car with new details
router.put('/update-car', carController.updateById);

// Delete a car with specified id
router.delete('/delete-car', carController.deleteById);


module.exports = router;