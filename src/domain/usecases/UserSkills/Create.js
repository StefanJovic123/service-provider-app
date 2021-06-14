class Create {
  constructor(UserSkillsService) {
    this.service = UserSkillsService;
  }

  /**
   * Create User Skill relation
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
