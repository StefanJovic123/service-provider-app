import connect from '../connection';
import { initializeOrm } from '../helpers';
import { DB_TYPES } from '../types';

// models
import User from './user';
import Skill from './skill';
import Request from './request';
import RequestSkill from './request-skill';
import UserSkill from './user-skill';

export const modelClasses = {
  User,
  Skill,
  Request,
  RequestSkill,
  UserSkill
};

export default async (config) => {
  const connection = await connect(config);

  return initializeOrm(modelClasses, connection, DB_TYPES);
};
