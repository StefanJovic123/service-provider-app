
import loggingMiddlewaresFactories from './logging';
import authenticateFactory from './authentication';
import cacheFactory from './cache';

const middlewareFactory = ({ AuthUseCases }, ports, cache) => {
  return {
    Authenticate: authenticateFactory(AuthUseCases, ports),
    Log: loggingMiddlewaresFactories,
    Cache: cacheFactory(cache),
  };
};

export default middlewareFactory;
