
import cleanup from '@application/middlewares/httpRequest/cleanup';
import validate from '@application/middlewares/httpRequest/validate';
import validationSchemes from '@infrastructure/validation/controllers/userSkills';
import getAllByUser from '../requests/getAllByUser';
import create from './create';
import update from './update';
import _delete from './delete';

export default (
  { UserSkillsUseCases },
  { Authenticate },
) => [
  {
    handler: getAllByUser(UserSkillsUseCases),
    method: 'GET',
    path: '/user-skills',
    middlewares: [
      Authenticate,
      cleanup.query
    ],
    environments: ['prod', 'dev', 'staging'],
  },
  {
    handler: create(UserSkillsUseCases),
    method: 'POST',
    path: '/user-skills',
    middlewares: [
      Authenticate,
      validate(validationSchemes.create.body, 'body'),
    ],
    environments: ['prod', 'dev', 'staging'],
  },
  {
    handler: update(UserSkillsUseCases),
    method: 'PATCH',
    path: '/user-skills/:id',
    middlewares: [
      Authenticate,
      validate(validationSchemes.update.body, 'body'),
      cleanup.params,
      validate(validationSchemes.update.byId, 'params'),
    ],
    environments: ['prod', 'dev', 'staging'],
  },
  {
    handler: _delete(UserSkillsUseCases),
    method: 'DELETE',
    path: '/user-skills/:id',
    middlewares: [
      Authenticate,
      cleanup.params,
      validate(validationSchemes.delete.byId, 'params'),
    ],
    environments: ['prod', 'dev', 'staging'],
  },
];