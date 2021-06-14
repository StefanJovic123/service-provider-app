import cleanup from './cleanup';

describe('cleanup', () => {
  it('should convert all keys to camel case', () => {
    const request = {
      body: {
        validField: 'this is valid field',
        invalid_field: -1,
      },
      query: {
        validField: 'this is valid field',
        invalid_field: -1,
      },
    };
    const validShape = {
      validField: 'this is valid field',
    };
    const bodyCleaner = cleanup.body;
    const queryCleaner = cleanup.query;
    const next = jest.fn();

    bodyCleaner(request, null, next);
    queryCleaner(request, null, next);

    expect(next).toBeCalled();
    expect(request.query).toMatchObject(validShape);
    expect(request.body).toMatchObject(validShape);
  });
});
