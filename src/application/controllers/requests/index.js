
import cleanup from '@application/middlewares/httpRequest/cleanup';
import validate from '@application/middlewares/httpRequest/validate';
import validationSchemes from '@infrastructure/validation/controllers/userRequests';
import getAll from './getAll';
import getAllByUser from './getAllByUser';
import createUserRequest from './createUserRequest';

export default (
  { RequestsUseCases },
  { Authenticate },
) => [
  {
    handler: getAll(RequestsUseCases),
    method: 'GET',
    path: '/requests',
    middlewares: [
      Authenticate,
      cleanup.query
    ],
    environments: ['prod', 'dev', 'staging'],
  },
  {
    handler: getAllByUser(RequestsUseCases),
    method: 'GET',
    path: '/user-requests',
    middlewares: [
      Authenticate,
      cleanup.query
    ],
    environments: ['prod', 'dev', 'staging'],
  },
  {
    handler: createUserRequest(RequestsUseCases),
    method: 'POST',
    path: '/user-requests',
    middlewares: [
      Authenticate,
      validate(validationSchemes.create.body, 'body'),
    ],
    environments: ['prod', 'dev', 'staging'],
  },
];