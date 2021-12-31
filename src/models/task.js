import Sequelize from 'sequelize';

export default class Task extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
          type: Sequelize.INTEGER,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        desc: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        startDate: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        dueDate: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        status: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: 'uncomplete',
        },
        type: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: 'default',
        },
        process: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        priority: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        likeNum: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Task',
        tableName: 'tasks',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.Task.hasMany(db.Comment, {
      foreignKey: 'task',
      sourceKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    db.Task.hasMany(db.Tag, {
      foreignKey: 'task',
      sourceKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    db.Task.hasMany(db.Belong, {
      foreignKey: 'task',
      sourceKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    db.Task.hasMany(db.SubTask, {
      foreignKey: 'task',
      sourceKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    db.Task.hasMany(db.Like, {
      foreignKey: 'task',
      sourceKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    db.Task.belongsTo(db.Section, {
      foreignKey: 'section',
      targetKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
}
