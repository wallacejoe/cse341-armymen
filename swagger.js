const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Users Api',
    description: 'Users Api',
  },
  host: 'cse341-armymen.onrender.com',
  schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);