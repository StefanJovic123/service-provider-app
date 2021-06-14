class GetAll {
  constructor(SkillsService) {
    this.skillsService = SkillsService;
  }

  /**
   * Get All Skills
   * @param {Object} query
   * @param {Object} options
   * @param {number} [options.limit] - how many skills to get
   * @param {number} [options.offset] - how many skills to skip
   * @return {Promise<*[]>}
   */
  async execute(query, options) {
    return this.skillsService.getAll(query, options);
  }
}

export default GetAll;
