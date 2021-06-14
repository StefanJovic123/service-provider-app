import Model from '../SequelizeModel';

class RequestSkill extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        requestId: { type: DataTypes.ID },
        skillId: { type: DataTypes.ID },
      },
      {
        tableName: 'requestSkills',
        ...this.Meta.baseConfig,
        sequelize,
      },
    );
  }

  static associate(models) {
    this.hasOne(models.Request, {
      as: 'request',
      sourceKey: 'requestId',
      foreignKey: 'id',
    });

    this.hasOne(models.Request, {
      as: 'skill',
      sourceKey: 'skillId',
      foreignKey: 'id',
    });
  }
};

export default RequestSkill;
