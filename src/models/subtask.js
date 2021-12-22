import Sequelize from 'sequelize';

export default class SubTask extends Sequelize.Model {
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
        modelName: 'SubTask',
        tableName: 'subtasks',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.SubTask.hasMany(db.Comment, {
      foreignKey: 'task',
      sourceKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    db.SubTask.hasMany(db.Tag, {
      foreignKey: 'task',
      sourceKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    db.SubTask.hasMany(db.Like, {
      foreignKey: 'task',
      sourceKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    db.SubTask.belongsTo(db.User, {
      foreignKey: 'assignee',
      targetKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    db.SubTask.belongsTo(db.Task, {
      foreignKey: 'task',
      targetKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
}
