import HttpError from './HttpError';

export default class AuthorizationError extends HttpError {
  constructor(message = 'Unauthorized access to the resource.', code = 403) {
    super(code, message);
    this.tags = ['authorizationError'];
  }
}
