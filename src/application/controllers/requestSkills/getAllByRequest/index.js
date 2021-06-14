export default ({ GetAllByRequest }) => async (req, res, next) => {
  try {
    const { query, params } = req;
    const { id } = params;
    const { offset = 0, limit = 10 } = query;

    const result = await GetAllByRequest.execute(id, { offset, limit });
    return res.sendRes(result);
  } catch (error) {
    next(error);
  }
}
