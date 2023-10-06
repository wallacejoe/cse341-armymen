const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'armymen Api',
    description: 'armymen Api',
  },
  host: 'cse341-armymen.onrender.com',
  schemes: ['https', 'http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);