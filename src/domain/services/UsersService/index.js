import { hash, compare } from '@common/utils';
import NodeJsonWebTokenJwtPort from '@infrastructure/jwt';
import BadRequest from '@common/error/BadRequest';
import config from '@common/config/env';
import Service from '../Service';

class UsersService extends Service {
  async save(data) {
    data.password = await hash(data.password);
    return this.repository.save(data);
  }

  async login(email, password) {
    const user = await this.repository.findOne({ email });

    if (!user) {
      throw new BadRequest('Password or email is not valid');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new BadRequest('Invalid Password');
    }

    const generator = new NodeJsonWebTokenJwtPort(config.General);
    const token = generator.generateJwt({ id: user.id });

    return {
      ...user,
      jwt: token
    }
  }
}

export default UsersService;
