import Model from '../SequelizeModel';

class Skill extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        name: { type: DataTypes.STRING }
      },
      {
        tableName: 'skills',
        ...this.Meta.baseConfig,
        sequelize,
      },
    );
  }
};

export default Skill;
