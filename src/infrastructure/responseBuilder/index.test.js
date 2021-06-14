import AuthenticationError from '@common/error/AuthenticationError';
import {
  responseBuilderFactory,
  sendEmptyFactory,
  sendErrorFactory,
  sendResFactory,
} from './index';

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('responseBuilder', () => {
  const responseBuilder = responseBuilderFactory();
  describe('Given an res object and next function', () => {
    const res = mockRes();
    const next = jest.fn();

    responseBuilder({}, res, next);

    it('should add function sendRes to res object', () => {
      expect(res).toHaveProperty('sendRes');
    });

    it('should add function sendEmpty to res object', () => {
      expect(res).toHaveProperty('sendEmpty');
    });

    it('should add function sendError to res object', () => {
      expect(res).toHaveProperty('sendError');
    });

    it('should call next function one time', () => {
      expect(next).toBeCalledTimes(1);
    });
  });
});

describe('sendEmpty', () => {
  const res = mockRes();
  const sendEmpty = sendEmptyFactory(res);
  describe('Given no arguments', () => {
    sendEmpty();

    it("should call res.json with object {code:204, message:'success', data: null}", () => {
      const expected = {
        code: 204,
        message: 'success',
        data: null,
      };
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toBeCalledWith(expected);
    });

    it('should call res.status with 204', () => {
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(204);
    });
  });
});

describe('sendError', () => {
  const res = mockRes();
  const sendError = sendErrorFactory(res);
  const error = new AuthenticationError();
  describe('Given error AuthenticationError', () => {
    sendError(error);

    it('should call res.json with object {code:error.code, message:error.message, data: null}', () => {
      const expected = {
        status: error.code,
        message: error.message,
        data: null,
      };
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toBeCalledWith(expect.objectContaining(expected));
    });

    it('should call res.status with 401', () => {
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(401);
    });
  });
});
