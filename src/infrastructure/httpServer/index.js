import ExpressServer from './express';

/**
 * Route structure.
 * @typedef {{path: string, middlewares: Middleware[], handler: Function, interceptors: Function[], method: 'GET'|'POST'|'PUT'|'DELETE', baseUrl: string}} Route
 */

/**
 * Middleware structure.
 * @typedef {{[path]: string, position: 'pre-router'|'post-router', handler: Function}} Middleware
 */

/**
 * Create instance of HttpServer.
 * @param {{}} config Server configuration
 */
const httpServerFactory = (config) => ExpressServer(config);

export default httpServerFactory;
