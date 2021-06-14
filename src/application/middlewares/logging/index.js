import { IDENTITY_PROVIDER_METHODS } from '@common/consts';
import { isArray, reduce } from '@common/utils';
import { formatSessionIdentifier } from '@infrastructure/session';

export const extractData = (req, accessors) => {
  if (!isArray(accessors)) {
    return null;
  }

  const data = reduce(
    accessors,
    (acc, accessor) => {
      acc[accessor] = req[accessor];
      return acc;
    },
    {},
  );

  return data;
};

export const extractIdentity = (req, accessor) => {
  if (accessor === IDENTITY_PROVIDER_METHODS.LEVEL_0.JWT) {
    return req.headers.Authorization || req.headers.authorization;
  }
  return null;
};

export const createLogRequestMiddlewareFactory = (accessor) => (
  { Log },
  identityAccessor,
) => async (req, res, next) => {
  try {
    const { routeConfig, [accessor]: data, saSessionId, saTimestamp } = req;
    const auditor = extractIdentity(req, identityAccessor);

    await Log.execute(data, auditor || {}, {
      ...routeConfig,
      saSessionId: formatSessionIdentifier(saSessionId, saTimestamp),
    });
  } catch (loggingError) {
    console.log({ loggingError });
  }
  next();
};

export const logMultipleRequestPartsMiddlewareFactory = (
  dataAccessors,
  { Log },
  identityAccessor,
) => async (req, res, next) => {
  try {
    const { routeConfig, saSessionId } = req;
    const data = extractData(req, dataAccessors);
    const auditor = extractIdentity(req, identityAccessor);

    await Log.execute(data, auditor, { ...routeConfig, saSessionId });
  } catch (loggingError) {
    console.log({ loggingError });
  }
  next();
};

export default {
  recordBody: createLogRequestMiddlewareFactory('body'),
  recordParams: createLogRequestMiddlewareFactory('params'),
  recordQuery: createLogRequestMiddlewareFactory('query'),
  recordMultiple: logMultipleRequestPartsMiddlewareFactory,
};
