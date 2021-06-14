import validate from '@application/middlewares/httpRequest/validate';
import validationSchemes from '@infrastructure/validation/controllers/auth';

import signup from './signup';
import login from './login';

export default (
  { UsersUseCases }
) => [
  {
    handler: signup(UsersUseCases),
    method: 'POST',
    path: '/signup',
    middlewares: [
      validate(validationSchemes.signup.body, 'body'),
    ],
    environments: ['prod', 'dev', 'staging'],
  },
  {
    handler: login(UsersUseCases),
    method: 'POST',
    path: '/login',
    middlewares: [
      validate(validationSchemes.login.body, 'body'),
    ],
    environments: ['prod', 'dev', 'staging'],
  }
];