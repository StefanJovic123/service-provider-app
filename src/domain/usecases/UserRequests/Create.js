class Create {
  constructor(UserRequestService) {
    this.service = UserRequestService;
  }

  /**
   * Create User Request relation
   * @return {Promise<*[]>}
   */
  async execute(body, user) {
    return this.service.save({
      ...body,
      userId: user.id
    });
  }
}

export default Create;
