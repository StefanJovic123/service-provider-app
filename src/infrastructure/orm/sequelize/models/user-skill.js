import Model from '../SequelizeModel';

class UserSkill extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        userId: { type: DataTypes.ID },
        skillId: { type: DataTypes.ID },
        experience: { type: DataTypes.INT64 },
      },
      {
        tableName: 'userSkills',
        ...this.Meta.baseConfig,
        sequelize,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });

    this.belongsTo(models.Skill, {
      foreignKey: 'skillId',
      as: 'skill',
    });
  }
};

export default UserSkill;
