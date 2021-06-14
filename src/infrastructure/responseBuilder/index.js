import path from 'path';
import { split } from '@common/dataMappers';
import config from '@common/config/env';

export const sendResFactory = (res) => (
  data,
  code = 200,
  message = 'success',
) => {
  const { transformerFns } = res;

  const transformData = async (originalData, fns) => {
    let intermediaryData = originalData;
    for (let i = 0; i < (fns?.length || 0); i += 1) {
      const fn = fns[i];
      intermediaryData = await fn(intermediaryData, res.req);
    }
    return intermediaryData;
  };

  if (transformerFns && transformerFns.length > 0) {
    return transformData(data, transformerFns).then((transformedData) => {
      const body = {
        code,
        message,
        data: transformedData
      };

      res.status(code).json(body);
    });
  }

  const body = {
    code,
    message,
    data
  };

  return res.status(code).json(body);
};

/**
 * Return response with data and count property
 * @param res
 * @returns {function(*=, *, *=, *=, *=): void}
 */
export const sendDataAndCountFactory = (res) => (
  data,
  count,
  code = 200,
  message = 'success',
) => {
  const body = {
    code,
    message,
    data,
    count,
  };

  res.status(code).json(body);
};

export const sendEmptyFactory = (res) => (code = 204, message = 'success') => {
  const body = {
    code,
    message,
    data: null,
  };

  res.status(code).json(body);
};

export const sendErrorFactory = (res) => (error, status = 500) => {
  const body = {
    status: error.code || status,
    message: error.message || 'Unknown Error',
    data: null,
  };

  res.status(error.code || status).json(body);
};

export const sendHtmlFactory = (res) => (file, viewParams) => {
  const filePathParts = split(file, '-');
  const filePath = path.join(config.General.ASSETS_LOCATION, ...filePathParts);

  res.render(filePath, viewParams);
};

export const responseBuilderFactory = () => (req, res, next) => {
  res.sendRes = sendResFactory(res);
  res.sendEmpty = sendEmptyFactory(res);
  res.sendError = sendErrorFactory(res);
  res.sendHtml = sendHtmlFactory(res);
  res.sendDataAndCount = sendDataAndCountFactory(res);
  next();
};

export const responseBuilderMiddleware = {
  position: 'pre-router',
  handler: responseBuilderFactory(),
};
