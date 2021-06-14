import Service from '../Service';

class RequestsService extends Service {
  async getAll(query, options) {
    return this.repository.findAllNotAssigned(query, options);
  }

  async getAllByUser(userId, options) {
    return this.repository.findAll({ assignedTo: userId }, options)
  }

  async getAllConflictingDates(dateFrom, userId) {
    return this.repository.findAllConflictingDates(dateFrom, userId);
  }
}

export default RequestsService;
