export default ({ Update }) => async (req, res, next) => {
  try {
    const { body, params } = req;
    const { id } = params;

    const result = await Update.execute(id, body);
    
    return res.sendRes(result);
  } catch (error) {
    next(error);
  }
}
