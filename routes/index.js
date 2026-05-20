const routes = require('express').Router();
const temple = require('./temple');
const review = require('./review');

routes.use('/', require('./swagger'));
routes.use('/temples', temple);
routes.use('/reviews', review);
routes.get('/', (req, res) => {
  res.send({
    message: 'Welcome to the Temple API',
    version: '1.0.0',
    routes: {
      documentation: '/api-docs',
      temples: '/temples',
      reviews: '/reviews',
    },
  });
});

module.exports = routes;
