import HttpServer from '@infrastructure/httpServer';
import Orm from '@infrastructure/orm';
import {
  initErrorHandlingService,
  errorCustomMiddleware,
  errorSentryRequestMiddleware,
  errorSentryMainMiddleware,
} from '@infrastructure/errorHandling';

import Cache from '@infrastructure/cache';
import Crypto from '@infrastructure/crypto';
import routeInfo from '@infrastructure/logger/routeInfo';
import constructRepositories from '@domain/repositories';
import constructServices from '@domain/services';
import constructUseCases from '@domain/usecases';
import ports from '@infrastructure/ports';
import constructApplicationLayer from '@application';

import config from '@common/config/env';
import { responseBuilderMiddleware } from '@infrastructure/responseBuilder';

/**
 * Construct server instance and run it.
 */
const constructAndRunServer = async () => {
  try {
    // initialize external services that need to be initialized as soon as possible
    initErrorHandlingService({ dsn: config.Sentry.DSN });
    const cache = new Cache();

    // init ORM
    const models = await Orm.Sequelize(config.DB);

    // construct domain logic
    const repositories = constructRepositories(models);
    const services = constructServices(repositories);
    const useCases = constructUseCases(services, cache);

    // construct infrastructure layer
    const infrastructure = { cache, Crypto };

    // construct application layer
    const application = constructApplicationLayer(useCases, ports, infrastructure);

    // they are split by position, but order matters within subset
    const middlewares = [
      routeInfo,
      responseBuilderMiddleware,
      errorSentryRequestMiddleware,
      errorSentryMainMiddleware,
      errorCustomMiddleware,
    ];
    // init HTTP server
    const serverConfig = {
      port: config.General.PORT,
      baseUrl: '/api/v1/',
      routes: application.restEndpoints,
      middlewares
    };

    HttpServer(serverConfig);
  } catch (err) {
    // This should catch only fatal, server initialization and other tools and development errors.
    // Business logic errors should go to error handling, sentry and custom, middlewares.
    // TIP: Do that by forwarding the error down the middleware chain with next, ex. next(error)
    console.error('FatalError:', err);
  }
};

constructAndRunServer();
