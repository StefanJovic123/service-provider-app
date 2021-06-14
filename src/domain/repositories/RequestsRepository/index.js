import Repository from '../Repository';

export default class RequestsRepository extends Repository {
  async findAllNotAssigned(query, options) {
    return this.model.findAllNotAssigned(query, options);
  }

  async findAllConflictingDates(dateFrom, userId) {
    return this.model.findAllConflictingDates(dateFrom, userId);
  }
}
