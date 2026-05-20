const routes = require('express').Router();
const temples = require('../controllers/temple.js');

routes.get('/', temples.findAll);

// Create a new Temple
routes.post('/', temples.create);

// Retrieve a single Temple with id
routes.get('/:temple_id', temples.findOne);

// Update a Temple with id
routes.put('/:temple_id', temples.update);

// Delete a Temple with id
routes.delete('/:temple_id', temples.delete);

module.exports = routes;
