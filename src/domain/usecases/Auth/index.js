import Authenticate from './Authenticate';

export default (AuthService) => ({
  Authenticate: new Authenticate(AuthService),
});
