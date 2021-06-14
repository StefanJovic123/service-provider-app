import _ from 'lodash';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

/**
 * Strip Starting Slash
 * @param str
 * @returns {*|string}
 */
export const stripStartingSlash = (str) => {
  return str.startsWith('/') ? str.substring(1) : str;
};

export const map = (data, fn = (e) => e) => _.map(data, fn);

export const reduce = (data, fn, initialValue) => _.reduce(data, fn, initialValue);

export const filter = (data, fn) => _.filter(data, fn);

export const find = (data, fn) => _.find(data, fn);

export const substring = (data, start, end) => _.join(_.slice(data, start, end), '');

/**
 * Checks if passed param is array.
 * @param data
 * @return {value is any[]}
 */
export const isArray = (data) => _.isArray(data);

/**
 * Checks if passed param is object.
 * @param data
 * @return {value is object}
 */
export const isObject = (data) => _.isObject(data);

export const isString = (fn) => _.isString(fn);

export const isFunction = (fn) => _.isFunction(fn);

export const generateJwtToken = (data, secret) => {
  return jwt.sign(data, secret);
}

export const decodeJwtToken = (token, secret) => {
  return jwt.verify(token, secret)
}

export const extractJwtToken = req => {
  const token = req.get('Authorization')
  return token ? token.replace('Bearer ', '') : null
}


export const hash = async (data) => {
  return await bcrypt.hash(data, 10)
}

export const compare = async (data, encryptedData) => {
  return await bcrypt.compare(data, encryptedData)
}
