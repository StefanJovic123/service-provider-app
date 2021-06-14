import Joi from 'joi';

export default {
  create: {
    body: Joi.object({
      requestId: Joi.number().integer().positive().required(),
    }),
  },
};
