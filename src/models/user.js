import Sequelize from 'sequelize';

export default class User extends Sequelize.Model {
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
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        role: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        department: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        about: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'User',
        tableName: 'users',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.ProjectMember, {
      foreignKey: 'user',
      sourceKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    db.User.hasMany(db.Comment, {
      foreignKey: 'user',
      sourceKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    db.User.hasMany(db.Task, {
      foreignKey: 'assignee',
      sourceKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    db.User.hasMany(db.SubTask, {
      foreignKey: 'assignee',
      sourceKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    db.User.hasMany(db.Collaborator, {
      foreignKey: 'collaborator',
      sourceKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
}
