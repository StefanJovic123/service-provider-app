import Users from './Users';
import Skills from './Skills';
import Auth from './Auth';
import Requests from './Requests';
import UserSkills from './UserSkills';
import RequestSkills from './RequestSkills';

export default (services, cache) => ({
  UsersUseCases: Users(services.UsersService),
  SkillsUseCases: Skills(services.SkillsService),
  AuthUseCases: Auth(services.AuthService),
  RequestsUseCases: Requests(services.RequestsService),
  UserSkillsUseCases: UserSkills(services.UserSkillsService, services.UsersService),
  RequestSkillsUseCases: RequestSkills(services.RequestSkillsService),
});
