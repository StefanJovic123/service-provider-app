import Service from '../Service';

export default class RequestSkillsService extends Service {
  async getAllByRequest(requestId, options) {
    const result = await this.repository.findAll({ requestId }, options);
    return result;
  }

  async save(data) {
    const result = await this.repository.save(data);
    const newlyAdded = await this.repository.findOne({ id: result.id });

    return newlyAdded;
  }
}
