class GetAllByRequest {
  constructor(RequestsService) {
    this.service = RequestsService;
  }

  /**
   * Get All Skills
   * @param {number} requestId
   * @param {Object} options
   * @param {number} [options.limit] - how many to get
   * @param {number} [options.offset] - how many to skip
   * @return {Promise<*[]>}
   */
  async execute(requestId, options) {
    return this.service.getAllByRequest(requestId, options);
  }
}

export default GetAllByRequest;
