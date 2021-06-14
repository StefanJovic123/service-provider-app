class GetAll {
  constructor(RequestsService) {
    this.requestsService = RequestsService;
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
    return this.requestsService.getAll(query, {
      include: [
        {
          association: 'requestSkills',
          include: [{ association: 'skill' }]
        }
      ],
      ...options,
    });
  }
}

export default GetAll;
