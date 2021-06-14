import GetAll from './GetAll';
import GetAllByRequest from './GetAllByRequest';

export default (RequestSkillsService) => ({
  GetAll: new GetAll(RequestSkillsService),
  GetAllByRequest: new GetAllByRequest(RequestSkillsService),
});
