import authenticateUserFactory from './authenticateUser';

const users = [
  {
    id: 124,
  },
  {
    id: 5866,
  },
  {
    id: 32
  },
];

describe('authenticateUser', () => {
  const UserRepository = {
    findById: async (id) => users.find((u) => u.id === id),
  };

  const authenticateUser = authenticateUserFactory(UserRepository);

  describe('Given id matching valid user', () => {
    const userId = 32;

    it('should return object with id', async () => {
      const { id } = await authenticateUser(userId);

      expect(id).toBe(userId);
    });
  });

  describe('Given id not matching any user', () => {
    const id = 10000;

    it('should throw AuthenticationError', async () => {
      expect.assertions(3);
      try {
        await authenticateUser(id);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.code).toBe(401);
        expect(error.message).toBe('Invalid jwt');
      }
    });
  });
});
