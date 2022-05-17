import { ExceptionName } from '~/common/enums/exceptions/exceptions';
import { HttpCode } from '~/common/enums/http/http-code.enum';

const DEFAULT_MESSAGE = 'unauthorized error';

class UnauthorizedError extends Error {
  status: HttpCode;

  constructor({
    status = HttpCode.UNAUTHORIZED,
    message = DEFAULT_MESSAGE,
  } = {}) {
    super(message);
    this.status = status;
    this.name = ExceptionName.UNAUTHORIZED;
  }
}

export { UnauthorizedError };
