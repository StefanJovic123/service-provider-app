import Login from './Login';

// Users Service
const login = jest.fn();
const UsersService = { login };

describe('Login', () => {
  const useCase = new Login(UsersService);

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
      password: 'stefan123',
    };

    it('should execute without an error', async () => {
      await useCase.execute(body.email, body.password);

      expect(login).toBeCalledWith(body.email, body.password);
    });
  });
});
