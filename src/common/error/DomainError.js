export default class DomainError extends Error {
  /**
   * @param code - unique code for each DomainError, specified in ErrorCodes.js
   * @param message - descriptive and user friendly message to be displayed in response body
   * @param debugMessage - detailed error message, displayed only if debug is enabled in configuration
   */
  constructor(code = 0, message, debugMessage) {
    super(message);
    this.code = code;
    this.debugMessage = debugMessage;
    this.tags = ['domainError'];
  }
}
