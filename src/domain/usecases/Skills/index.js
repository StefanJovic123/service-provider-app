import GetAll from './GetAll';

export default (SkillService) => ({
  GetAll: new GetAll(SkillService)
});
