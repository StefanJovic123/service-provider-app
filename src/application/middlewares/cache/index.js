export const cacheValues = (cache, id, values) => {
  if (!cache || typeof cache.setItem !== 'function') {
    return;
  }
  cache.setItem(id, values);
};

export const extractCachedValues = (cache, id) => cache && cache[id];

export const cacheValuesMiddlewareFactory = (accessor, cache) => (req, res, next) => {
  try {
    const { saSessionId, [accessor]: values } = req;

    cacheValues(cache, saSessionId, values);
  } catch (cachingError) {
    console.log({ cachingError });
  }

  next();
};

export default (cache) => ({
  recordBody: cacheValuesMiddlewareFactory('body', cache),
  recordQuery: cacheValuesMiddlewareFactory('query', cache),
  recordParams: cacheValuesMiddlewareFactory('params', cache),
});
