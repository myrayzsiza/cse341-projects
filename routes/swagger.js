const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const { ensureAuthenticated } = require('../middleware/auth');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', ensureAuthenticated, swaggerUi.setup(swaggerDocument));

module.exports = router;
