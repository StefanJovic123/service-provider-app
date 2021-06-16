class Create {
  constructor(UserSkillsService, UserService) {
    this.service = UserSkillsService;
    this.usersService = UserService;
  }

  /**
   * Complete user profile by setting all skills
   * @return {Promise<*[]>}
   */
  async execute(userSkills, user) {
    await this.service.bulkSave(userSkills.map(skill => ({
      ...skill,
      userId: user.id
    })));
    
    return this.usersService.update(
      {
        skillsSet: true
      },
      { id: user.id }
    );
  }
}

export default Create;
