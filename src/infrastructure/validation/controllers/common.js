import Joi from 'joi';

export const id = Joi.number().integer().positive();

export default {
  limit: Joi.number().positive().optional(),
  offset: Joi.number().positive().allow(0).optional(),
  order: Joi.array().items(Joi.string()).optional(),
  q: Joi.string(),
};
