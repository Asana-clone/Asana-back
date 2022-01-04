import 'dotenv/config';

export = {
  type: 'mysql',
  host: 'localhost',
  port: process.env.DB_PORT,
  username:
    process.env.NODE_ENV === 'development'
      ? process.env.DEV_DB_USER
      : process.env.PRODUCT_DB_USER,
  password:
    process.env.NODE_ENV === 'development'
      ? process.env.DEV_DB_PW
      : process.env.PRODUCT_DB_PW,
  database: process.env.DB_NAME,
  entities: ['src/entity/*.ts', 'dist/entity/*.js'],
  synchronize: true,
  dropSchema: true,
  logging: true,
};
