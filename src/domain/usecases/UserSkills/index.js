import GetAll from './GetAll';
import GetAllByUser from './GetAllByUser';
import Create from './Create';
import Update from './Update';
import Delete from './Delete';
import CompleteProfile from './CompleteProfile';

export default (UserSkillsService, UsersService) => ({
  GetAll: new GetAll(UserSkillsService),
  GetAllByUser: new GetAllByUser(UserSkillsService),
  Create: new Create(UserSkillsService),
  Update: new Update(UserSkillsService),
  Delete: new Delete(UserSkillsService),
  CompleteProfile: new CompleteProfile(UserSkillsService, UsersService)
})
