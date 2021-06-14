import Model from '../SequelizeModel';

class User extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        firstName: { type: DataTypes.STRING },
        lastName: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
        password: { type: DataTypes.STRING },
        skillsSet: { type: DataTypes.BOOLEAN }
      },
      {
        tableName: 'users',
        ...this.Meta.baseConfig,
        sequelize,
      },
    );
  }

  static associate(models) {
    this.hasMany(models.UserSkill, {
      as: 'skills',
      sourceKey: 'id',
      foreignKey: 'userId',
    });
  }
};

export default User;
