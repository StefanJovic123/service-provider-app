import HttpError from './HttpError';

export default class BadRequest extends HttpError {
  constructor(message = 'Bad Request') {
    super(400, message);
    this.tags = ['badRequest'];
  }
}
