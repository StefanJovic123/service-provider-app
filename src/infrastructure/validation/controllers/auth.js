import Joi from 'joi';

export default {
  login: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(3).required(),
    }),
  },
  signup: {
    body: Joi.object({ 
      firstName: Joi.string().required(), 
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(3).required(),
    }),
  },
};
