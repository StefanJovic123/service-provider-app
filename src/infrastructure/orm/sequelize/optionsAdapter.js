import { cleanNilValues, cleanNaNValues } from '@common/dataMappers';

export default (options) => {
  if (!options) {
    return {};
  }

  const opts = {
    transaction: options.transaction,
    limit: options.limit ? Number.parseInt(options.limit, 10) : 100,
    offset: options.offset ? Number.parseInt(options.offset, 10) : 0,
  };

  if (options.sorting) {
    opts.order = options.sorting.map((s) => [s.sortBy, s.order]);
  }

  if (options.include) {
    opts.include = options.include
  }

  return cleanNaNValues(cleanNilValues(opts));
};
