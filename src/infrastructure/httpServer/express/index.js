import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import registerMiddlewares from './middlewares';
import registerRoutes from './router';

/**
 * Create instance of ExpressHttpServer.
 * @param {{}} config Server configuration
 */
const expressHttpServerFactory = (config = {}) => {
  const { port = 9000, baseUrl, routes = [], middlewares = [] } = config;
  // create Express HTTP server instance
  const app = express();
  app.use(express.json()); // without this, body can not be sent

  // filter middlewares by position in chain
  const preRouterMiddlewares = middlewares.filter((midd) => midd.position === 'pre-router');
  const postRouterMiddlewares = middlewares.filter((midd) => midd.position === 'post-router');

  // Security middleware
  app.use(cors());
  app.use(
    helmet({
      hsts: {
        maxAge: 31536000,
      },
    }),
  );

  app.use(bodyParser.json());
  app.use(
    bodyParser.raw({
      inflate: true,
      limit: 10000,
      type: ['text/plain', 'application/json'],
    }),
  );
  app.use(bodyParser.urlencoded({ extended: false }));

  // register middlewares and router
  registerMiddlewares(app, preRouterMiddlewares);
  registerRoutes(app, baseUrl, routes);
  registerMiddlewares(app, postRouterMiddlewares);

  // Handle not found routes
  app.use((req, res, next) => {
    res.status(404);
    res.json({
      status: 404,
      message: 'Route not found',
    });
    next();
  });

  // listen for incoming connections
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

  return app;
};

export default expressHttpServerFactory;
