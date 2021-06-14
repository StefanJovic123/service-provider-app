// Repositories
import UsersRepository from './UsersRepository';
import SkillsRepository from './SkillsRepository';
import RequestsRepository from './RequestsRepository';
import UserSkillsRepository from './RequestSkillsRepository';
import RequestSkillsRepository from './RequestSkillsRepository';

// Model Schemas
import usersSchemes from '../models/users';
import skillsSchemes from '../models/skills';
import requestsSchemes from '../models/requests';
import requestSkillsSchemes from '../models/requestSkills';
import userSkillsSchemes from '../models/userSkills';

export default (db) => ({
  UsersRepository: new UsersRepository(db.PSQLDB.models.User, usersSchemes),
  SkillsRepository: new SkillsRepository(db.PSQLDB.models.Skill, skillsSchemes),
  RequestsRepository: new RequestsRepository(db.PSQLDB.models.Request, requestsSchemes),
  UserSkillsRepository: new UserSkillsRepository(db.PSQLDB.models.UserSkill, userSkillsSchemes),
  RequestSkillsRepository: new RequestSkillsRepository(db.PSQLDB.RequestSkill, requestSkillsSchemes),
});
