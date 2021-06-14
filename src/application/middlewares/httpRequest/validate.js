import validate from '@infrastructure/validation';
import ValidationError from '@common/error/ValidationError';
import { toCamelCase } from '@common/dataMappers';
import _ from 'lodash';

/**
 * Factory method that creates middleware to validate request object
 * @param scheme Scheme to use for validation.
 * @param accessor Request data accessor. One of ['query', 'body'].
 * @returns {function(*, *, *): void}
 */
const validateMiddlewareFactory = (scheme, accessor) => (req, res, next) => {
  try {
    const data = req[accessor];

    const {
      ok, 
      errors, 
      value 
    } = validate(
      data, 
      _.isFunction(scheme) ? scheme(data) : scheme
    );

    if (!ok) {
      throw new ValidationError(errors);
    }

    // replace data with parsed and formatted value
    req[accessor] = toCamelCase(value);

    next();
  } catch (error) {
    next(error);
  }
};

export default validateMiddlewareFactory;
