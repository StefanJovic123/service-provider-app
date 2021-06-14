/**
 * Register middlewares to Express server
 * @param {*} server Express server to register middlewares to.
 * @param {Middleware[]} middlewares List of middlewares to register.
 */
const registerMiddlewares = (server, middlewares = []) =>
  middlewares.forEach((middleware) => {
    const { handler } = middleware;
    const { path } = middleware;

    if (path) {
      server.use(path, handler);
      return;
    }

    server.use(handler);
  });

export default registerMiddlewares;
