class Delete {
  constructor(UserSkillsService) {
    this.service = UserSkillsService;
  }

  /**
   * Create User Skill relation
   * @return {Promise<*[]>}
   */
  async execute(id) {
    return this.service.deleteById(id);
  }
}

export default Delete;
