class GetAllByUser {
  constructor(UserSkillsService) {
    this.service = UserSkillsService;
  }

  /**
   * Get All Skills
   * @param {number} userId
   * @param {Object} options
   * @param {number} [options.limit] - how many to get
   * @param {number} [options.offset] - how many to skip
   * @return {Promise<*[]>}
   */
  async execute(userId, options) {
    return this.service.getAllByUser(userId, options);
  }
}

export default GetAllByUser;
