import NodeJsonWebTokenJwtPort from '@infrastructure/jwt';
import config from '@common/config/env';

export default {
  JwtPort: new NodeJsonWebTokenJwtPort(config.General),
};
