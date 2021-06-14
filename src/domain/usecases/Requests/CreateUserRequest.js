import BadRequest from '@common/error/BadRequest';

class CreateUserRequest {
  constructor(RequestsService) {
    this.requestsService = RequestsService;
  }

  /**
   * Creates connection between user and request
   * @param {Object} body
   * @param {Object} user
   * @return {Promise<*[]>}
   */
  async execute(body, user) {

    // fetch request
    const request = await this.requestsService.getById(body.requestId);

    // check conflicting dates based on already assigned requests to same user
    const conflictingRequests = await this.requestsService.getAllConflictingDates(request.dateFrom, user.id);

    console.log('conflictingRequests !!!', conflictingRequests)

    if (conflictingRequests.length > 0) {
      throw new BadRequest('Can not take this request cause there are requests within same date.');
    }

    return this.requestsService.update(
      {
        assignedTo: user.id
      },
      { id: body.requestId },
      {
      include: [
        {
          association: 'requestSkills',
          include: [{ association: 'skill' }]
        }
      ]
    })
  }
}

export default CreateUserRequest;
