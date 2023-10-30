const express = require('express');
// Express Router used to interact with CRUD functions
const router = express.Router();
const carController = require('../controllers/cars.controller');

// Create a new car
// POST
// eg http://localhost:8080/cars/add
router.post('/add', carController.create);

// Get all cars
// GET
// http://localhost:8080/cars
router.get('/', carController.findAll);

// Get all cars older than 5 years
// GET
// http://localhost:8080/cars/olderThan5
router.get('/olderThan5', carController.findOlderThan5Years);

// Update a car with new details
// PUT
// http://localhost:8080/cars/update-car
router.put('/update-car', carController.updateByReg);

// Delete a car with specified id (make sure I create it first)
// DELETE
// http://localhost:8080/cars/delete-car/ZZZ111
router.delete('/delete-car/:reg', carController.deleteByReg);



module.exports = router;