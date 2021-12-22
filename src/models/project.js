import Sequelize from 'sequelize';

export default class Project extends Sequelize.Model {
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
        subject: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        start: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        end: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        desc: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        inviteCode: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Project',
        tableName: 'projects',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.Project.hasMany(db.ProjectMember, {
      foreignKey: 'project',
      sourceKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    db.Project.hasMany(db.Section, {
      foreignKey: 'project',
      sourceKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    db.Project.hasMany(db.Belong, {
      foreignKey: 'project',
      sourceKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
}
