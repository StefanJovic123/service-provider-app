class Create {
  constructor(UsersService) {
    this.usersService = UsersService;
  }

  async execute(body) {
    return this.usersService.save(body);
  }
}

export default Create;
