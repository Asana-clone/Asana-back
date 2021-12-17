import env from '../env.js';

const config = {
  development: {
    username: env.DB_USER,
    password: env.DB_PW,
    database: env.DB_NAME,
    host: env.END_POINT,
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
    username: env.DB_USER,
    password: env.DB_PW,
    database: env.DB_NAME,
    host: env.END_POINT,
    dialect: 'mysql',
  },
};

export default config;
