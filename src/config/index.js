const environment = require('dotenv').config();

const config = {
  server: {
    port: process.env.SERVER_PORT
  },
  urlBase: process.env.URL_BASE,
};

module.exports = {
  ...config,
};
