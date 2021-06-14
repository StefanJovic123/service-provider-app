import Joi from 'joi';
import common from './common';

export default {
  read: {
    all: Joi.object({ ...common }),
    byRequest: Joi.object({ id: Joi.number().positive().required() }),
  },
};


