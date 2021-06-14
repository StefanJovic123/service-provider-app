import authenticateUserFactory from './authenticateUser';

// for the sake of simplicity this is just a function, not a class
export default ({
  UsersRepository,
}) => ({
  authenticateUser: authenticateUserFactory(UsersRepository),
});
