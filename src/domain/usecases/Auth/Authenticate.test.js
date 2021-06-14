import Authenticate from './Authenticate';

describe('Authenticate UseCase', () => {

  describe('Given a userId', () => {
    const userId = 467;
    it('should call authService.authenticateUser', async () => {
      const authenticateUser = jest.fn();
      const authService = { authenticateUser };

      const authenticate = new Authenticate(authService);

      await authenticate.execute(userId);

      expect(authenticateUser).toBeCalledTimes(1);
      expect(authenticateUser).toBeCalledWith(userId);
    });
  });
});
