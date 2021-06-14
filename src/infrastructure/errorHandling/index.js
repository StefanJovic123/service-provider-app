import * as Sentry from '@sentry/node';
import HttpError from '@common/error/HttpError';
import DomainError from '@common/error/DomainError';

// eslint-disable-next-line no-unused-vars
export const errorCustomHandler = (err, req, res, next) => {
  console.log({ error: err });

  // Currency Cloud errors / handle elsewere
  if (err && err.errors) {
    return res.status(err.response?.statusCode || 500).send({ message: err.errors });
  }
  if (err instanceof HttpError) {
    return res.sendError(err, err.code);
  }
  if (err instanceof DomainError) {
    return res.sendError(err, err.code);
  }

  return res.sendError(err);
};
export const errorCustomMiddleware = {
  position: 'post-router',
  handler: errorCustomHandler,
};

const errorSentryRequestHandler = Sentry.Handlers.requestHandler();
export const errorSentryRequestMiddleware = {
  position: 'pre-router',
  handler: errorSentryRequestHandler,
};

const errorSentryMainHandler = Sentry.Handlers.errorHandler({
  shouldHandleError(err) {
    // should catch only specific errors
    // use status codes to control it
    Sentry.setTags(err.tags);
    return true;
  },
});
export const errorSentryMainMiddleware = {
  position: 'post-router',
  handler: errorSentryMainHandler,
};

export const initErrorHandlingService = (config = {}) => Sentry.init(config);
