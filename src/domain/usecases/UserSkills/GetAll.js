class GetAll {
  constructor(UserSkillsService) {
    this.service = UserSkillsService;
  }

  /**
   * Get All Skills
   * @param {Object} query
   * @param {Object} options
   * @param {number} [options.limit] - how many to get
   * @param {number} [options.offset] - how many to skip
   * @return {Promise<*[]>}
   */
  async execute(query, options) {
    return this.service.getAll(query, options);
  }
}

export default GetAll;
