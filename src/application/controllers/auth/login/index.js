export default ({ Login }) => async (req, res, next) => {
  try {
    const { body } = req;
    const result = await Login.execute(body.email, body.password);

    return res.sendRes(result);
  } catch (error) {
    next(error);
  }
}
