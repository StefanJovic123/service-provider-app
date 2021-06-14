import GetAll from './GetAll';

const toReturn = [1, 2, 3];
const getAll = jest.fn(() => Promise.resolve(toReturn));
const service = { getAll };

describe('GetAll', () => {
  it('should instantiate use case well', () => {
    const instance = new GetAll(service);

    expect(instance.service).toBeDefined();
    expect(instance.service).toMatchObject(service);
  });

  it('should execute without an error', async () => {
    const useCase = new GetAll(service);
    const query = { field: 'some data to return' };

    const returned = await useCase.execute(query);

    expect(getAll).toBeCalledWith(query, undefined);
    expect(returned).toMatchObject(toReturn);
  });
});
