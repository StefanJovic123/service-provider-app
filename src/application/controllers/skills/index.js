
import cleanup from '@application/middlewares/httpRequest/cleanup';
import getAll from './getAll';

export default (
  { SkillsUseCases },
  { Authenticate },
) => [
  {
    handler: getAll(SkillsUseCases),
    method: 'GET',
    path: '/skills',
    middlewares: [
      Authenticate,
      cleanup.query
    ],
    environments: ['prod', 'dev', 'staging'],
  },
];