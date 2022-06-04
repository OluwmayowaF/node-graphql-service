const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 5050;

module.exports = {
  app: {
    appName: process.env.APP_NAME || 'GraphQL Service',
    environment: process.env.NODE_ENV || 'development',
    port: PORT,
    baseUrl: `${process.env.BASE_URL}` || `http://localhost:${PORT}`,
  },
  databases: {
    firestore: {
      url: process.env.FIRESTORE_DB_URL,
    },
  },
};
