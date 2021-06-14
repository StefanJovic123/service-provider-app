class Update {
  constructor(UserSkillsService) {
    this.service = UserSkillsService;
  }

  /**
   * Create User Skill relation
   * @return {Promise<*[]>}
   */
  async execute(id, body) {
    return this.service.update(body, { id }, {
      include: [{ association: 'skill' }]
    });
  }
}

export default Update;
