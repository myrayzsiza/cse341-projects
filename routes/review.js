const routes = require('express').Router();
const reviews = require('../controllers/review.js');
const { ensureAuthenticated } = require('../middleware/auth');

routes.get('/', reviews.findAll);
routes.post('/', ensureAuthenticated, reviews.create);
routes.get('/:review_id', reviews.findOne);
routes.put('/:review_id', ensureAuthenticated, reviews.update);
routes.delete('/:review_id', ensureAuthenticated, reviews.delete);

module.exports = routes;
