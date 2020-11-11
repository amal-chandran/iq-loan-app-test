require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'loan_app_development',
    host: process.env.DB_HOSTNAME || '127.0.0.1',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'loan_app_test',
    host: process.env.DB_HOSTNAME || '127.0.0.1',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'loan_app_production',
    host: process.env.DB_HOSTNAME || '127.0.0.1',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};
