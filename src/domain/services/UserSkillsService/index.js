import Service from '../Service';

export default class UserSkillsService extends Service {
  async getAllByUser(userId, options) {
    const result = await this.repository.findAll({ userId }, options);
    return result;
  }

  async save(data) {
    const result = await this.repository.save(data);
    const newlyAdded = await this.repository.findOne({ id: result.id }, {
      include: [{ association: 'skill' }]
    });
    return newlyAdded;
  }
}
