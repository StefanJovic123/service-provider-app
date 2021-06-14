import controllersFactory from './controllers';
import middlewareFactory from './middlewares';

export default (useCases, ports, infrastructure) => ({
  restEndpoints: controllersFactory(
    useCases,
    middlewareFactory(useCases, ports, infrastructure.cache),
    infrastructure
  ),
});
