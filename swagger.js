const swaggerAutogen = require('swagger-autogen')();
const fs = require('fs');

const doc = {
  info: {
    title: 'Temple API',
    description: 'CRUD API for temples and reviews with validation and error handling.',
  },
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json and remove any hardcoded host/schemes values
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  const swagger = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
  delete swagger.host;
  delete swagger.schemes;
  fs.writeFileSync(outputFile, JSON.stringify(swagger, null, 2));
});
