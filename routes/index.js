const routes = require('express').Router();
const temple = require('./temple');
const review = require('./review');

routes.use('/', require('./swagger'));
routes.use('/temples', temple);
routes.use('/reviews', review);
routes.use('/', (req, res) => {
  res.send({ documentationURL: 'https://nathanbirch.github.io/nathan-byui-api-docs' });
});

module.exports = routes;
