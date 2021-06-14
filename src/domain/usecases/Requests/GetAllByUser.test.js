import GetAllByUser from './GetAllByUser';

const toReturn = [1, 2, 3];
const getAllByUser = jest.fn(() => Promise.resolve(toReturn));
const service = { getAllByUser };

describe('GetAllByUser', () => {
  it('should instantiate use case well', () => {
    const instance = new GetAllByUser(service);

    expect(instance.service).toBeDefined();
    expect(instance.service).toMatchObject(service);
  });

  it('should execute without an error', async () => {
    const useCase = new GetAllByUser(service);
    const userId = 123;

    const returned = await useCase.execute(userId);

    expect(getAllByUser).toBeCalledWith(userId, {
      include: [{ association: 'skill' }]
    });
    expect(returned).toMatchObject(toReturn);
  });
});
