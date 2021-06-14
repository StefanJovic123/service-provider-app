import Sequelize from 'sequelize';
import { bulkParseModel, extractField } from '@common/dataMappers';
import optionsAdapter from './optionsAdapter';

export const { Op } = Sequelize;

/**
 * Sequelize model contains all necessary methods defined in DomainModel class.*
 * It also has all common configuration for the Sequelize.Model and extends it
 * by the needs of Sequelize ORM
 *
 * * NOTE: Since JS allows only single inheritance and sequelize already implements
 *         almost all methods it is not extended here.
 *         Please make sure to add all other methods if needed as findByPrimaryKey is added.
 */
class SequelizeModel extends Sequelize.Model {
  static Meta = {
    baseConfig: {
      freezeTableName: true,
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      deletedAt: 'deletedAt',
      paranoid: true,
    },
  };

  /**
   * Predefined findAll method to convert to snake case and create query.
   * @param query
   * @param options
   * @returns {Promise<*>}
   */
  static async getAll(query, options) {
    const opts = optionsAdapter(options);

    return super.findAll({ where: query, ...opts });
  }

  /**
   * Predefined findOne method to convert to snake case and create query.
   * @param query
   * @param options
   * @returns {Promise<*>}
   */
  static async getOne(query, options) {
    const opts = optionsAdapter(options);

    return super.findOne({ where: query, ...opts });
  }

  /**
   * Predefined findAndCountAll method to convert to snake case and create query.
   * @param query
   * @param options
   * @returns {Promise<*>}
   */
  static async getAndCountAll(query, options) {
    const opts = optionsAdapter(options);

    return super.findAndCountAll({ where: query, ...opts });
  }

  /**
   * Predefine create method to convert to snake case.
   * @param instance
   * @param options
   * @returns {Promise<<Model<T, T2>>>}
   */
  static async create(instance, options) {
    let values = instance;
    return super.create(values, optionsAdapter(options));
  }

  /**
   * @param instance
   * @param options
   * @returns {Promise<<Model<T, T2>>>}
   */
  static async update(values, query, options) {
    await super.update(values, {
      where: query,
      ...optionsAdapter(options),
    });

    return super.findOne({ where: query, options });
  }

  /**
   * Fix because update above doesn't work well for multiple updates
   */
  static async updateFix(values, options) {
    return super.update(values, options);
  }

  /**
   * Predefined method to include soft delete by default. Alias for destroy.
   * @param id
   * @param softDelete
   * @param options
   * @returns {Promise<<number>>} IDs of the deleted records.
   */
  static async delete(query, softDelete, options) {
    const records = await super.findAll({ where: query, attributes: ['id'] });
    const ids = extractField(bulkParseModel(records), 'id');

    await super.destroy({
      where: { id: ids },
      force: !softDelete,
      ...optionsAdapter(options),
    });

    return ids;
  }

  /**
   * Method defined in DomainModel and here it is basically an alias for findByPk
   * @param  {...any} params
   */
  static async getByPrimaryKey(param, options) {
    return super.findByPk(param, options);
  }
}

export default SequelizeModel;
