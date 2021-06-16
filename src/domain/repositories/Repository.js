import {
  bulkParseModel,
  bulkSanitize,
  parseModel,
  sanitize
} from '@common/dataMappers';

/**
 * Options passed to model functions
 * @typedef {{ limit: number, offset: number, order: string[]|string, transaction: {} }} QueryOptions
 */

export default class Repository {
  /**
   * Create instance with the data model of DomainModel type.
   * @param {DomainModel} model Data model used in repository.
   * @param schemes Schemes used in this repository for sanitizing data.
   */
  constructor(model, schemes = {}) {
    this.model = model;
    this.modelSchemes = schemes;
  }

  get schemes() {
    const scheme = {
      read: this.modelSchemes.read || {},
      create: this.modelSchemes.create || {},
      update: this.modelSchemes.update || {},
    };
    return scheme;
  }

  /**
   * Finds all records for the specified query.
   * @param {QueryOptions} options
   * @returns {Promise<*>}
   */
  async findAll(query, options = null) {
    const instances = await this.model.getAll(query, options);

    const toDomain = bulkParseModel(instances);
    return bulkSanitize(toDomain, this.schemes.read.defaultFields);
  }

  /**
   * Finds one record for the specified query.
   * @param query
   * @param options
   * @returns {Promise<*>}
   */
  async findOne(query, options = null) {
    const instance = await this.model.getOne(query, options);

    if (!instance) {
      return null;
    }

    const toDomain = parseModel(instance);
    return sanitize(toDomain, this.schemes.read.defaultFields);
  }

  /**
   * Finds all records for the specified query and count them.
   * @param {QueryOptions} options
   * @returns {Promise<*>}
   */
  async findAndCountAll(query, options = null) {
    const response = await this.model.getAndCountAll(query, options);
    const { count, rows: instances = [] } = response || {};

    const toDomain = bulkParseModel(instances);
    return {
      count,
      rows: bulkSanitize(toDomain, this.schemes.read.defaultFields),
    };
  }

  /**
   * Finds record by primary key.
   * @param id Primary key.
   * @param {QueryOptions} options
   * @returns {Promise<any>}
   * @param virtualFields
   */
  async findById(id, options = null, virtualFields) {
    const instance = await this.model.getByPrimaryKey(id, options);

    if (!instance) {
      return null;
    }

    const toDomain = parseModel(instance, false, virtualFields);
    return sanitize(toDomain, this.schemes.read.defaultFields);
  }

  /**
   * Creates record from passed instance and returns created record.
   * @param instance Camel case instance to create.
   * @param {QueryOptions} options
   * @returns {Promise<*>}
   */
  async save(instance, options = null) {
    const snakeCaseInstance = sanitize(instance, this.schemes.create.defaultFields);

    const created = await this.model.create(snakeCaseInstance, options);

    const toDomain = parseModel(created);

    return sanitize(toDomain, this.schemes.create.returnFields);
  }

  /**
   * Bulk create records by passing array of objects.
   * @param instances
   * @param {QueryOptions} options
   * @returns {Promise<*[]>}
   */
  async bulkSave(instances = [], options = null) {
    const sanitized = bulkSanitize(instances, this.schemes.create.defaultFields);

    const createdRecords = [];
    for (let i = 0; i < sanitized.length; i++) {
      const snakeCaseInstance = instances[i];
      const created = await this.model.create(snakeCaseInstance, options);

      createdRecords.push(created);
    }
    return bulkSanitize(createdRecords, this.schemes.create.returnFields);
  }

  /**
   * Update values of a records matched by query.
   * @param values Camel case object of values to update.
   * @param query Camel case object of query values.
   * @param {QueryOptions} options
   * @returns {Promise<*>}
   */
  async update(values, query, options = null) {
    // filter by scheme
    const sanitized = sanitize(values, this.schemes.update.defaultFields);

    // should update and return updated values;
    const updated = await this.model.update(sanitized, query, options);

    const toDomain = parseModel(updated);

    // filter from scheme and return
    return sanitize(toDomain, this.schemes.update.returnFields);
  }

  /**
   * Soft delete a record with the specified primary key.
   * @param query Query by which to find the record to delete.
   * @param softDelete Flag that controls wether instance is soft deleted or no. Default equals to true.
   * @param {QueryOptions} options
   * @returns {Promise<void>}
   */
  async delete(query, softDelete = true, options = null) {
    return this.model.delete(query, softDelete, options);
  }
}
