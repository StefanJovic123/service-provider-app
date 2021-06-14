import Joi from 'joi';
import validateMiddlewareFactory from './validate';

describe('validateMiddlewareFactory', () => {
  const scheme = Joi.object({
    id: Joi.number().positive().required(),
    name: Joi.string().optional(),
  });
  const validateBody = validateMiddlewareFactory(scheme, 'body');
  const validateQuery = validateMiddlewareFactory(scheme, 'query');
  const successHandler = jest.fn((error) => expect(error).toBeUndefined());
  const errorHandler = jest.fn((error) => expect(error).toBeDefined());

  it('should call next handler if data is valid', () => {
    const validBody = { body: { id: 19 } };
    const validQuery = {
      query: {
        id: 2,
        name: 'Test name',
      },
    };

    validateBody(validBody, {}, successHandler);
    validateQuery(validQuery, {}, successHandler);

    expect(successHandler).toBeCalledTimes(2);
  });

  it('should call error handler if data is invalid', () => {
    const invalidBody = { body: { name: 'Test name' } };
    const invalidQuery = {
      query: {
        id: -1,
        name: 'Test name',
      },
    };

    validateBody(invalidBody, {}, errorHandler);
    validateQuery(invalidQuery, {}, errorHandler);

    expect(errorHandler).toBeCalledTimes(2);
  });
});
