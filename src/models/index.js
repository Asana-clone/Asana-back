import Sequelize from 'sequelize';
import config from '../config/config.js';
import User from './user.js';
import Project from './project.js';
import Belong from './belong.js';
import Comment from './comment.js';
import ProjectMember from './projectmember.js';
import Task from './task.js';
import Section from './section.js';
import SubTask from './subtask.js';
import Tag from './tag.js';

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
db.Belong = Belong;
db.Comment = Comment;
db.ProjectMember = ProjectMember;
db.Section = Section;
db.SubTask = SubTask;
db.Tag = Tag;
db.Task = Task;

User.init(sequelize);
Belong.init(sequelize);
Comment.init(sequelize);
Project.init(sequelize);
ProjectMember.init(sequelize);
Section.init(sequelize);
SubTask.init(sequelize);
Tag.init(sequelize);
Task.init(sequelize);

User.associate(db);
Belong.associate(db);
Project.associate(db);
Comment.associate(db);
ProjectMember.associate(db);
Section.associate(db);
SubTask.associate(db);
Tag.associate(db);
Task.associate(db);

export default db;
