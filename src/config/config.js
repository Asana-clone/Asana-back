import dotenv from 'dotenv'
dotenv.config();

const config = {
  development: {
    username: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PW,
    database: process.env.DB_NAME,
    host: process.env.DEV_END_POINT,
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: process.env.PRODUCT_DB_USER,
    password: process.env.PRODUCT_DB_PW,
    database: process.env.DB_NAME,
    host: process.env.PRODUCT_END_POINT,
    dialect: 'mysql',
  },
};

export default config;
