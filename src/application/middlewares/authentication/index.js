import _ from 'lodash';
import AuthenticationError from '@common/error/AuthenticationError';

const parseBearerToken = (bearer) => _.slice(bearer, 'Bearer '.length).join('');

export const extractJwt = (headers = {}) => {
  if (!headers.Authorization && !headers.authorization) {
    return null;
  }

  if (headers.authorization) {
    return parseBearerToken(headers.authorization);
  }

  return parseBearerToken(headers.Authorization);
};

const extractHeader = (headers = {}, name) => {
  if (!headers[name]) {
    return null;
  }

  return headers[name];
};

/**
 * This middleware adds authenticated user to req object
 *
 *
 * Format of user object:
 *    {id: int} - id represents id of logged in user
 */
const authenticateFactory = ({ Authenticate }, { JwtPort }) => async (req, _res, next) => {
  try {
   const jwt = extractJwt(req.headers);
    
    if (jwt) {
      const { id } = JwtPort.verify(jwt);
      req.user = await Authenticate.execute(id);
    }

    if (req.user) {
      next();
    } else {
      throw new AuthenticationError();
    }
  } catch (error) {
    // pass it to the error handler
    next(error);
  }
};

export default authenticateFactory;
