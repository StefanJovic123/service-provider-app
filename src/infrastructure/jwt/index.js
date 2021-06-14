import jwt from 'jsonwebtoken';

export default class NodeJsonWebTokenJwtPort {
  constructor({ JWT_SECRET }) {
    this.jwtSecret = JWT_SECRET;
  }

  generateJwt(payload, expiresIn) {
    const options = { algorithm: 'HS256' };
    if (expiresIn) {
      options.expiresIn = expiresIn;
    }
    const token = jwt.sign(payload, this.jwtSecret, options);
    return token;
  }

  verify(token) {
    const options = { algorithm: 'HS256' };
    return jwt.verify(token, this.jwtSecret, options);
  }

  decode(token) {
    return jwt.decode(token);
  }
}
