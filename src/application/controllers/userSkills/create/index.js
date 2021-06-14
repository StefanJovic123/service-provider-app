export default ({ Create }) => async (req, res, next) => {
  try {
    const { body, user } = req;
    const result = await Create.execute(body, user);

    return res.sendRes(result);
  } catch (error) {
    next(error);
  }
}
