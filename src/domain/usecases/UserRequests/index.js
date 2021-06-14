import GetAllByUser from './GetAllByUser';
import Create from './Create';

export default (UserSkillsService) => ({
  GetAllByUser: new GetAllByUser(UserSkillsService),
  Create: new Create(UserSkillsService),
});
