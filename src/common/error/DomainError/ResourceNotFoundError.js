import DomainError from '../DomainError';

export default class ResourceNotFoundError extends DomainError {
  constructor(message = 'Requested resource not found.') {
    super(404, message);
    this.tags = [...this.tags, 'resourceNotFoundError'];
  }
}
