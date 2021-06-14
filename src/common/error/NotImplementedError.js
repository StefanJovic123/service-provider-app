export default class NotImplementedError extends Error {
  constructor(message = 'Not implemented yet!!!') {
    super(message);
    this.code = 501;
    this.tags = ['notImplementedError'];
  }
}
