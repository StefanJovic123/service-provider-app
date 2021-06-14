class GetAllByUser {
  constructor(UserRequestsService) {
    this.service = UserRequestsService;
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
    return this.service.getAllByUser(userId, {
      ...options,
      include: [
        { association: 'request' }
      ]
    });
  }
}

export default GetAllByUser;
