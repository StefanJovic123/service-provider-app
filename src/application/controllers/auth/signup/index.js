export default ({ Create }) => async (req, res, next) => {
  try {
    const { body } = req;
    const result = await Create.execute(body);

    return res.sendRes(result);
  } catch (error) {
    next(error);
  }
}
