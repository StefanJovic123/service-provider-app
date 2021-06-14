import Joi from 'joi';

export default {
  create: {
    body: Joi.object({
      skillId: Joi.number().integer().positive().required(),
      experience: Joi.number().integer().min(1).max(10).required()
    }),
  },
  update: {
    body: Joi.object({ 
      experience: Joi.number().integer().min(1).max(10).required()
    }),
    byId: Joi.object({
      id: Joi.number().positive().required()
    })
  },
  delete: {
    byId: Joi.object({
      id: Joi.number().positive().required()
    })
  }
};
