export default ({ CompleteProfile }) => async (req, res, next) => {
  try {
    const { body, user } = req;
    const result = await CompleteProfile.execute(body, user);

    return res.sendRes(result);
  } catch (error) {
    next(error);
  }
}
