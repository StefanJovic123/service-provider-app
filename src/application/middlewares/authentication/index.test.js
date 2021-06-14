import AuthenticationError from '@common/error/AuthenticationError';
import authenticateFactory from './index';

const users = [
  {
    id: 32
  },
];

describe('Authentication Middleware', () => {
  const Authenticate = {
    execute: (id) => {
      if (id) {
        return users.find((u) => u.id === id);
      }

      throw new AuthenticationError();
    },
  };

  const JwtPort = {
    generateJwt: ({ id }) =>
      JSON.stringify({
        id,
      }),
    verify: (jwt) => JSON.parse(jwt),
  };

  const authentication = authenticateFactory({ Authenticate }, { JwtPort });

  describe('Given request Authorization header', () => {
    const req = { headers: {} };

    it('should call next with AuthenticationError', () => {
      expect.assertions(3);
      const next = (error) => {
        expect(error).toBeDefined();
        expect(error.code).toBe(401);
        expect(error.message).toBe('Not authenticated.');
      };
      authentication(req, {}, next);
    });
  });

  describe('Given request with jwt matching user', () => {
    const id = 32;
    const jwt = JwtPort.generateJwt({ id });
    const req = { headers: { Authorization: `Bearer ${jwt}` } };

    it('should add user with id', async () => {
      await authentication(req, {}, () => ({}));
      expect(req.user).toBeDefined();
      expect(req.user.id).toBe(id);
    });

    it('should call next without error', async () => {
      expect.assertions(1);
      const next = (error) => {
        expect(error).toBeUndefined();
      };
      await authentication(req, {}, next);
    });
  });
});
