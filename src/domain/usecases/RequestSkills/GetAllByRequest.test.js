import GetAllByRequest from './GetAllByRequest';

const toReturn = [1, 2, 3];
const getAllByRequest = jest.fn(() => Promise.resolve(toReturn));
const service = { getAllByRequest };

describe('GetAllByRequest', () => {
  it('should instantiate use case well', () => {
    const instance = new GetAllByRequest(service);

    expect(instance.service).toBeDefined();
    expect(instance.service).toMatchObject(service);
  });

  it('should execute without an error', async () => {
    const useCase = new GetAllByRequest(service);
    const requestId = 123;

    const returned = await useCase.execute(requestId);

    expect(getAllByRequest).toBeCalledWith(requestId, undefined);
    expect(returned).toMatchObject(toReturn);
  });
});
