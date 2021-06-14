export default class QueryOptions {
  constructor({ transaction, pagination, sorting }) {
    this.transaction = transaction;
    this.pagination = pagination;
    this.sorting = sorting;
  }

  static paged({ offset, limit }) {
    return new QueryOptions({ pagination: { offset, limit } });
  }

  static sorted({ sortBy, order }) {
    return new QueryOptions({ sorting: [{ sortBy, order }] });
  }

  static transactional(transaction) {
    return new QueryOptions({ transaction });
  }

  withPagination({ offset, limit }) {
    this.pagination = { offset, limit };
    return this;
  }

  withSorting({ sortBy, order }) {
    this.sorting.push({ sortBy, order });
    return this;
  }

  withTransaction(transaction) {
    this.transaction = transaction;
    return this;
  }
}
