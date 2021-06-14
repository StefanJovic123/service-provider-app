export default ({ CreateUserRequest }) => async (req, res, next) => {
  try {
    const { body, user } = req;
    const result = await CreateUserRequest.execute(body, user);
    return res.sendRes(result);
  } catch (error) {
    next(error);
  }
}
