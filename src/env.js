import 'dotenv/config';

const isDev = process.env.NODE_ENV === 'development';
const env = {
  NODE_ENV: process.env.NODE_ENV,

  PORT: process.env.PORT,

  DB_USER: isDev ? process.env.DEV_DB_USER : process.env.PRODUCT_DB_USER,
  DB_PW: isDev ? process.env.DEV_DB_PW : process.env.PRODUCT_DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  END_POINT: isDev ? process.env.DEV_END_POINT : process.env.PRODUCT_END_POINT,

  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};
export default env;