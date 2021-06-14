import { uuidV5, substring } from '@common/utils';
import Cypher from '../crypto';

export const formatSessionIdentifier = (id, timestamp) => {
  const crypto = new Cypher();
  const combined = `${timestamp || ''}${id}`;

  return substring(crypto.sha256(combined), 0, 20);
};

/**
 * Middleware that generates and injects into request unique session id and timestamp,
 * that will be used across middlewares and handlers,
 * for various purposes, like logging, error reporting etc.
 * If session id already exists within header it is used instead.
 *
 * NOTE: it is not to be used as unique identifiers for sensitive data.
 * @param req
 * @param res
 * @param next
 */
export const sessionIdGenerationHandler = (req, _res, next) => {
  // generate session id or use existing
  req.saSessionId = req.headers['sa-session-id'] || uuidV5();
  req.saTimestamp = Date.now();
  next();
};

export const sessionIdGenerationMiddleware = {
  position: 'pre-router',
  handler: sessionIdGenerationHandler,
};
