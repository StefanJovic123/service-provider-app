import _ from 'lodash';
import moment from 'moment';
import { isArray } from './utils';

export const sanitize = (obj, allowedFields) => {
  const fields =
    allowedFields && _.isArray(allowedFields) && _.every((el) => _.isString(el))
      ? _.map(allowedFields, _.camelCase)
      : _.keys(obj);
  return _.pick(obj, fields);
};
export const bulkSanitize = (arrayOfObjects, allowedFields) =>
  _.map(arrayOfObjects, (o) => sanitize(o, allowedFields));

export const convertKeysFactory =
  (convertFn) =>
  (obj, deep = true) => {
    const convertKeys = (object) => {
      if (!deep) {
        // go only one level
        return _.mapKeys(object, (value, key) => convertFn(key));
      }
      if (_.isArray(object)) {
        // go for each object in array
        return object.map((o) => convertKeys(o));
      }
      if (object !== null && _.isPlainObject(object)) {
        return _.keys(object).reduce((res, key) => {
          return {
            ...res,
            [convertFn(key)]: convertKeys(object[key]),
          };
        }, {});
      }
      return object;
    };
    return convertKeys(obj);
  };
export const strToSnakeCase = (str) => _.snakeCase(str);
export const toSnakeCase = convertKeysFactory(_.snakeCase);
export const toLowerCase = convertKeysFactory(_.toLower);
export const bulkToSnakeCase = (objects) => _.map(objects, toSnakeCase);
export const toCamelCase = convertKeysFactory(_.camelCase);
export const bulkToCamelCase = (objects, deep) => _.map(objects, (obj) => toCamelCase(obj, deep));
/**
 * Removes null and undefined fields.
 * @param obj
 * @returns {Pick<object, Exclude<keyof object, [(null | undefined)[]][number]>>}
 */
export const cleanNilValues = (obj) =>
  _.omit(
    obj,
    _.keys(obj).filter((key) => _.isNil(obj[key])),
  );
/**
 * Remove list of provided fields from object
 * @param obj
 */
export const excludeFields = (obj, fieldsToBeExcluded) =>
  _.omit(
    obj,
    _.keys(obj).filter((key) => fieldsToBeExcluded.includes(key)),
  );
/**
 * Removes NaN fields.
 * @param obj
 * @returns {Pick<object, Exclude<keyof object, [string[]][number]>>}
 */
export const cleanNaNValues = (obj) =>
  _.omit(
    obj,
    _.keys(obj).filter((key) => _.isNaN(obj[key])),
  );
/**
 * Parse Model
 * @param obj
 * @param deep
 * @param virtualFields Virtual fields to extract from model.
 * @returns {*|{}}
 */
export const parseModel = (obj, deep = false, virtualFields = {}) => {
  const extract = (o, entityName) => {
    const values = (o && o.dataValues) || o;
    if (values) {
      _.forEach(
        _.filter(virtualFields[entityName], (field) => _.isString(field)),
        (field) => {
          const snakeField = _.snakeCase(field);
          values[snakeField] = o && o[snakeField];
        },
      );
    }
    return values;
  };
  const parseFn = (o, entityName) => {
    if (!deep) {
      return extract(o, entityName);
    }
    if (_.isArray(obj)) {
      return _.map(obj, (e) => parseFn(e, entityName));
    }
    const currentLevel = extract(o, entityName);
    if (currentLevel && _.isPlainObject(currentLevel)) {
      return _.keys(currentLevel).reduce((acc, key) => {
        let value;
        const field = currentLevel[key];
        if (_.isArray(field)) {
          value = _.map(
            _.filter(currentLevel[key], (e) => e),
            (e) => parseFn(e, key),
          );
        } else {
          value = parseFn(currentLevel[key], key);
        }
        const res = {
          ...acc,
          [key]: value,
        };
        return res;
      }, {});
    }
    return o;
  };
  return parseFn(obj, 'main');
};

/**
 * Bulk Parse Model
 * @param objects
 * @param deep
 * @returns {unknown[]}
 */
export const bulkParseModel = (objects, deep = false, virtualFields = {}) =>
  _.map(objects, (obj) => parseModel(obj, deep, virtualFields));
export const extractField = (data, field) => {
  if (_.isArray(data)) {
    return _.map(data, (o) => o[field]);
  }
  if (_.isObject(data)) {
    return data[field];
  }
  return data;
};

/**
 * Flatten Object
 * @param object
 * @returns {*}
 */
export const flattenObject = (object) => {
  return _.forOwn(object, (value, key) => {
    if (_.isPlainObject(value) && !_.isArray(value)) {
      _.merge(object, object[key]);
      delete object[key];
    }
  });
};

/**
 * The string conversions of all array elements are joined into one string
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
 * @param arr
 * @param token
 * @returns {null|*}
 */
export const joinArray = (arr, token = '') => {
  if (arr) {
    return arr.join(token);
  }

  return null;
};

export const capitalize = (str) => _.capitalize(str);

export const toUpper = (str) => _.toUpper(str);

export const toLower = (str) => _.toLower(str);

export const parseDate = (dateString, format = 'MM-DD-YYYY') => moment(dateString).format(format);

export const split = (str, separator) => _.split(str, separator);

const SPECIAL_CHARACTERS_REGEX = new RegExp(
  /'|\/|\\|\{|\}|@|#|\$|\^|%|&|\*|\(|\)|-|=|\+|_|\[|\]|'|"|;|:|\?|\.|>|,|<|\||!/g,
);
export const removeSpecialCharacters = (str) => _.replace(str, SPECIAL_CHARACTERS_REGEX, '');

export const parseObjectFromArray = (data, nth = 0) => {
  if (isArray(data)) {
    return data[nth];
  }
  return data;
};
