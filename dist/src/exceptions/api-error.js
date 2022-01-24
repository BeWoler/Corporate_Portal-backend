"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(status, message, errors) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
    static BadRequest(message, errors) {
        return new ApiError(400, message, errors);
    }
    static UnauthorizedError() {
        return new ApiError(401, 'Unauthorized', [{ message: 'Unauthorized' }]);
    }
}
exports.ApiError = ApiError;
;
//# sourceMappingURL=api-error.js.map