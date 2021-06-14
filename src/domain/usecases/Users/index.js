import Create from './Create';
import Login from './Login';

export default (UsersService) => ({
  Create: new Create(UsersService),
  Login: new Login(UsersService),
});
