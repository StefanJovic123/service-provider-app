import GetAll from './GetAll';
import GetAllByUser from './GetAllByUser';
import CreateUserRequest from './CreateUserRequest';

export default (RequestsService) => ({
  GetAll: new GetAll(RequestsService),
  GetAllByUser: new GetAllByUser(RequestsService),
  CreateUserRequest: new CreateUserRequest(RequestsService),
});
