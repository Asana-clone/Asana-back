import Sequelize from 'sequelize';

export default class Tag extends Sequelize.Model {
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
        color:{
          type: Sequelize.STRING,
          allowNull:true
        }
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Tag',
        tableName: 'tags',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.Tag.hasMany(db.TagRelation, {
      foreignKey: 'tag',
      targetKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
}
