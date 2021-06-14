const transformer = (accessor) => (req, res, next) => {
  const fields = req[accessor];

  req[accessor] = fields;
  next();
};

export default {
  body: transformer('body'),
  query: transformer('query'),
  params: transformer('params'),
};
