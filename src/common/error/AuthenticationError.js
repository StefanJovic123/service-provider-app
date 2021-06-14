import HttpError from './HttpError';

export default class AuthenticationError extends HttpError {
  constructor(message) {
    super(401, message || 'Not authenticated.');
    this.tags = ['authenticationError'];
  }
}
