

import validate from '@application/middlewares/httpRequest/validate';
import validationSchemes from '@infrastructure/validation/controllers/requestSkills';
import cleanup from '@application/middlewares/httpRequest/cleanup';
import getAll from './getAll';

export default (
  { RequestSkillsUseCases },
  { Authenticate },
) => [
  {
    handler: getAll(RequestSkillsUseCases),
    method: 'GET',
    path: '/request-skills',
    middlewares: [
      Authenticate
    ],
    environments: ['prod', 'dev', 'staging'],
  },
  {
    handler: getAll(RequestSkillsUseCases),
    method: 'GET',
    path: '/request-skills/:id',
    middlewares: [
      Authenticate,
      cleanup.params,
      validate(validationSchemes.read.byRequest, 'params'),
      cleanup.query
    ],
    environments: ['prod', 'dev', 'staging'],
  },
];