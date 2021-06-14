import AuthenticationError from '@common/error/AuthenticationError';

const authenticateUserFactory = (userRepository) => async (userId) => {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new AuthenticationError('Invalid jwt');
  }

  const { id } = user;

  if (!id) {
    throw new AuthenticationError('Invalid jwt');
  }

  return Object.freeze({
    id
  });
};

export default authenticateUserFactory;
