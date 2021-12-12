import Sequelize from 'sequelize';
import config from '../config/config.js';
import User from './user.js';
import Project from './project.js';
const env = 'development';
const db = {};

export const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  config[env]
);

db.sequelize = sequelize;
db.User = User;
db.Project = Project;

User.init(sequelize);
Project.init(sequelize);

User.associate(db);
Project.associate(db);

export default db;
