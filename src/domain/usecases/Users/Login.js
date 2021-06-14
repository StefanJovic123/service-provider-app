class Login {
  constructor(UsersService) {
    this.usersService = UsersService;
  }

  async execute(email, password) {
    return this.usersService.login(email, password);
  }
}

export default Login;
