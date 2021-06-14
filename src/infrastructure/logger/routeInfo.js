const routeInfo = (req, res, next) => {
  console.log('---------------------------------');
  console.log(`[${req.method}]: ${req.path}`);

  // eslint-disable-next-line no-unused-expressions
  Object.entries(req.query || {}).length > 0 && console.log('\tParams:');
  Object.entries(req.query || {}).forEach(([key, value]) => console.log(`\t\t${key}: ${value}`));
  
  // eslint-disable-next-line no-unused-expressions
  ['POST', 'PUT'].includes(req.method) && console.log({ body: req.body });
  console.log('---------------------------------');
  next();
};

export default {
  position: 'pre-router',
  handler: routeInfo,
};
