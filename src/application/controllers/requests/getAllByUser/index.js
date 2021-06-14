export default ({ GetAllByUser }) => async (req, res, next) => {
  try {
    const { query, user } = req;
    const { id } = user;
    const { offset = 0, limit = 10 } = query;

    const result = await GetAllByUser.execute(id, { offset, limit });
    return res.sendRes(result);
  } catch (error) {
    next(error);
  }
}
