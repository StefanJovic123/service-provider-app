import HttpError from './HttpError';

export default class ValidationError extends HttpError {
  constructor(message = 'Validation failed', errors) {
    super(400, message);
    this.tags = ['validationError'];
    this.details = errors;
  }
}
