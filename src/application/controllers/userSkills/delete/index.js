export default ({ Delete }) => async (req, res, next) => {
  try {
    const { params } = req;
    const { id } = params;

    const result = await Delete.execute(id);
    return res.sendRes(result);
  } catch (error) {
    next(error);
  }
}
