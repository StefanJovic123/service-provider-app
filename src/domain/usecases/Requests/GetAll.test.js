import GetAll from './GetAll';

const toReturn = [1, 2, 3];
const getAll = jest.fn(() => Promise.resolve(toReturn));
const service = { getAll };

describe('GetAll', () => {
  it('should instantiate use case well', () => {
    const instance = new GetAll(service);

    expect(instance.requestsService).toBeDefined();
    expect(instance.requestsService).toMatchObject(service);
  });

  it('should execute without an error', async () => {
    const useCase = new GetAll(service);
    const query = { field: 'some data to return' };

    const returned = await useCase.execute(query);

    expect(getAll).toBeCalledWith(query, {
      include: [
        {
          association: 'requestSkills',
          include: [{ association: 'skill' }]
        }
      ]
    });
    expect(returned).toMatchObject(toReturn);
  });
});
