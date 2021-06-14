import Create from './Create';

// Users Service
const save  = jest.fn();
const UsersService = { save };

describe('Create', () => {
  const useCase = new Create(UsersService);

  describe('initialization', () => {
    it('should instantiate use case well', () => {
      expect(useCase).toBeDefined();

      expect(useCase.usersService).toBeDefined();
      expect(useCase.usersService).toMatchObject(UsersService);
    });
  });

  describe('execute', () => {
    // mock function params
    const body = {
      email: 'stefan@gmail.com',
      firstName: 'Stefan',
      lastName: 'Jovic',
      password: 'stefan123',
    };

    it('should execute without an error', async () => {
      await useCase.execute(body);

      expect(save).toBeCalledWith(body);
    });
  });
});
