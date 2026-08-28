class APIError extends Error {
  constructor(statusCode, message = 'something went wrong', errors = []) {
    super(message);
    this.statusCode = statusCode >= 400;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;
  }
}

export default APIError;
