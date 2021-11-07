export class ApiError extends Error {
  status: number;
  errors: object[];

  constructor(status: number, message: string, errors: object[]) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message: string, errors: object[]) {
    return new ApiError(400, message, errors);
  }

  static UnauthorizedError() {
    return new ApiError(401, 'Unauthorized', [{message: 'Unauthorized'}]);
  }
};
