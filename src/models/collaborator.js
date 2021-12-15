import Sequelize from 'sequelize';

export default class Collaborator extends Sequelize.Model {
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
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Collaborator',
        tableName: 'collaborators',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.Collaborator.belongsTo(db.Project, {
      foreignKey: 'project',
      targetKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    db.Collaborator.belongsTo(db.Collaborator, {
      foreignKey: 'collaborator',
      targetKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
}
