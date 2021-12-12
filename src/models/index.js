import Sequelize from 'sequelize';
import User from './user.js';

const env = 'development';
import config from '../config/config.js';
const db = {};

export const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  config[env]
);

db.sequelize = sequelize;
db.User = User;

User.init(sequelize);

User.associate(db);

export default db;
