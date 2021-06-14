/**
 * Generic getAll handler
 * @description Executes GetAllUseCase with req.query
 * @param {{}} GetAllUseCase
 */
export const getAll = ({ GetAll }) => async (req, res, next) => {
  try {
    const { query, user } = req;

    const result = await GetAll.execute(query, user);

    return res.sendRes(result);
  } catch (error) {
    return next(error);
  }
};

/**
 * Generic createOne handler
 * @description Executes CreateUseCase with req.body and req.user
 * @param {{}} CreateUseCase
 */
export const createOne = ({ Create }) => async (req, res, next) => {
  try {
    const { body, user } = req;

    const result = await Create.execute(body, user);

    return res.sendRes(result);
  } catch (error) {
    return next(error);
  }
};

/**
 * Generic getOne handler
 * @description Executes GetOneUseCase with req.params.id
 * @param {{}} GetOneUseCase
 */
export const getOne = ({ GetOne }) => async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const result = await GetOne.execute(id);

    return res.sendRes(result);
  } catch (error) {
    return next(error);
  }
};

/**
 * Generic updateOne handler
 * @description Executes UpdateUseCase with req.params.id
 * @param {{}} UpdateUseCase
 */
export const updateOne = ({ Update }) => async (req, res, next) => {
  try {
    const {
      params: { id },
      body,
      user,
    } = req;

    const result = await Update.execute(body, { id }, user);

    return res.sendRes(result);
  } catch (error) {
    return next(error);
  }
};

/**
 * Generic deleteOne handler
 * @description Executes DeleteUseCase with req.params.id and req.query
 * @param {{}} DeleteUseCase
 */
export const deleteOne = ({ Delete }) => async (req, res, next) => {
  try {
    const {
      params: { id },
      query: { hardDelete },
      user,
    } = req;

    const result = await Delete.execute(id, hardDelete, user);

    return res.sendRes(result);
  } catch (error) {
    return next(error);
  }
};
