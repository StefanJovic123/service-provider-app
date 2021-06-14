import UsersService from './UsersService';
import SkillsService from './SkillsService';
import AuthService from './AuthService';
import RequestsService from './RequestsService'; 
import UserSkillsService from './UserSkillsService';
import RequestSkillsService from './RequestSkillsService';

export default (repositories) => {
  return {
    UsersService: new UsersService(repositories.UsersRepository),
    SkillsService: new SkillsService(repositories.SkillsRepository),
    AuthService: AuthService(repositories),
    RequestsService: new RequestsService(repositories.RequestsRepository),
    UserSkillsService: new UserSkillsService(repositories.UserSkillsRepository),
    RequestSkillsService: new RequestSkillsService(repositories.RequestSkillsRepository),
  };
};
