export default ({ GetAll }) => async (req, res, next) => {
  try {
    const { query } = req;
    const { offset = 0, limit = 10, ...filterQuery } = query;

    const result = await GetAll.execute(filterQuery, { offset, limit });
    return res.sendRes(result);
  } catch (error) {
    next(error);
  }
}
