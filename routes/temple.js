const routes = require('express').Router();
const temples = require('../controllers/temple.js');
const { ensureAuthenticated } = require('../middleware/auth');

routes.get('/', temples.findAll);

// Create a new Temple
routes.post('/', ensureAuthenticated, temples.create);

// Retrieve a single Temple with id
routes.get('/:temple_id', temples.findOne);

// Update a Temple with id
routes.put('/:temple_id', ensureAuthenticated, temples.update);

// Delete a Temple with id
routes.delete('/:temple_id', ensureAuthenticated, temples.delete);

module.exports = routes;
