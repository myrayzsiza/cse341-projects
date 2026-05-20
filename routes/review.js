const routes = require('express').Router();
const reviews = require('../controllers/review.js');

routes.get('/', reviews.findAll);
routes.post('/', reviews.create);
routes.get('/:review_id', reviews.findOne);
routes.put('/:review_id', reviews.update);
routes.delete('/:review_id', reviews.delete);

module.exports = routes;
