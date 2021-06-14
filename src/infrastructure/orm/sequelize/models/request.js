import { Op } from 'sequelize';
import Model from '../SequelizeModel';

class Request extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        title: { type: DataTypes.STRING },
        description: { type: DataTypes.TEXT },
        dateFrom: { type: DataTypes.STRING },
        dateTo: { type: DataTypes.STRING },
        assignedTo: { type: DataTypes.ID },
      },
      {
        tableName: 'requests',
        ...this.Meta.baseConfig,
        sequelize,
      },
    );
  }

  static associate(models) {
    this.hasMany(models.RequestSkill, {
      as: 'requestSkills',
      sourceKey: 'id',
      foreignKey: 'requestId',
    });
  }

  static async findAllNotAssigned(query, options) {
    return super.findAll({
      where: {
        assignedTo: {
          [Op.eq]: null
        },
        ...query
      },
      ...options
    })
  }

  static async findAllConflictingDates(dateFrom, userId) {
    return super.findAll({
      where: {
        dateFrom: {
          [Op.eq]: dateFrom
        },
        assignedTo: userId,
        deletedAt: {
          [Op.eq]: null
        }
      }
    })
  }
};

export default Request;
