import Sequelize from 'sequelize';

export default class Goal extends Sequelize.Model {
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
        public: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        initial: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        current: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        target: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Goal',
        tableName: 'goals',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.Goal.belongsTo(db.Project, {
      foreignKey: 'project',
      targetKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    db.Goal.hasMany(db.Collaborator, {
      foreignKey: 'collaborator',
      sourceKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
}
