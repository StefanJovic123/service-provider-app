import * as logging from './index';

describe('extractData', () => {
  it('should return null', () => {
    const invalidAccessors = ['test', 1, true, {}, null, undefined];

    invalidAccessors.forEach((accessor) => {
      const data = logging.extractData({}, accessor);

      expect(data).toBeNull();
    });
  });

  it('should return data', () => {
    const body = { id: 1 };
    const query = { limit: 10 };
    const params = { id: 1 };
    const req = { query, body, params };
    const expected = { body, params };

    const data = logging.extractData(req, ['body', 'params']);

    expect(data).toMatchObject(expected);
  });
});

describe('extractIdentity', () => {
  it('should return null', () => {
    const identity = logging.extractIdentity({}, null);

    expect(identity).toBeNull();
  });
  it('should extract Authorization header', () => {
    const req = {
      headers: { Authorization: 'Bearer asdf' },
    };

    const identity = logging.extractIdentity(req, 'jwt');

    expect(identity).toEqual('Bearer asdf');
  });
  it('should extract authorization header', () => {
    const req = {
      headers: { authorization: 'Bearer asdf' },
    };

    const identity = logging.extractIdentity(req, 'jwt');

    expect(identity).toEqual('Bearer asdf');
  });
});

describe('createLogRequestMiddlewareFactory', () => {
  const createLogRequestMiddlewareQueryFactory = logging.createLogRequestMiddlewareFactory('query');
  const createLogRequestMiddlewareBodyFactory = logging.createLogRequestMiddlewareFactory('body');
  const createLogRequestMiddlewareParamsFactory = logging.createLogRequestMiddlewareFactory(
    'params',
  );
  const LogUseCase = { execute: jest.fn() };
  const createLogRequestMiddlewareQuery = createLogRequestMiddlewareQueryFactory(
    { Log: LogUseCase },
    'user',
  );
  const createLogRequestMiddlewareBody = createLogRequestMiddlewareBodyFactory(
    { Log: LogUseCase },
    'user',
  );
  const createLogRequestMiddlewareParams = createLogRequestMiddlewareParamsFactory(
    { Log: LogUseCase },
    'user',
  );

  it('should catch an error and continue flow', async () => {
    const nextQuery = jest.fn();
    const nextBody = jest.fn();
    const nextParams = jest.fn();

    await createLogRequestMiddlewareQuery(null, null, nextQuery);
    await createLogRequestMiddlewareBody(null, null, nextBody);
    await createLogRequestMiddlewareParams(null, null, nextParams);

    expect(nextQuery).toBeCalledWith();
    expect(nextBody).toBeCalledWith();
    expect(nextParams).toBeCalledWith();
  });

  it('should log and continue flow', async () => {
    const body = { id: 1 };
    const query = { limit: 10 };
    const params = { id: 1 };
    const req = { query, body, params };
    const nextQuery = jest.fn();
    const nextBody = jest.fn();
    const nextParams = jest.fn();

    await createLogRequestMiddlewareQuery(req, null, nextQuery);
    await createLogRequestMiddlewareBody(req, null, nextBody);
    await createLogRequestMiddlewareParams(req, null, nextParams);

    expect(LogUseCase.execute).toBeCalledTimes(3);
    expect(nextQuery).toBeCalledWith();
    expect(nextBody).toBeCalledWith();
    expect(nextParams).toBeCalledWith();
  });
});

describe('logMultipleRequestPartsMiddlewareFactory', () => {
  const LogUseCase = { execute: jest.fn() };
  const logMultipleRequestPartsMiddlewareParams = logging.logMultipleRequestPartsMiddlewareFactory(
    'params',
    { Log: LogUseCase },
    'user',
  );

  it('should catch an error and continue flow', async () => {
    const nextParams = jest.fn();

    await logMultipleRequestPartsMiddlewareParams(null, null, nextParams);

    expect(nextParams).toBeCalledWith();
  });

  it('should log and continue flow', async () => {
    const params = { id: 1 };
    const req = { params };
    const nextParams = jest.fn();

    await logMultipleRequestPartsMiddlewareParams(req, null, nextParams);

    expect(LogUseCase.execute).toBeCalledTimes(1);
    expect(nextParams).toBeCalledWith();
  });
});
