import { ClientError_4xx as httpCode } from '../config/httpCodes'

class AppErrors {
    public readonly message: string;

    public readonly statusCode: number;

    constructor (message: string, statusCode = httpCode.BadRequest) {
      this.message = message
      this.statusCode = statusCode
    }
}

export default AppErrors
