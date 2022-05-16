import { ExceptionName } from '~/common/enums/exceptions/exceptions';
import { HttpCode } from '~/common/enums/http/http-code.enum';

const DEFAULT_MESSAGE = 'network error';

class HttpError extends Error {
  status: HttpCode;

  constructor({
    status = HttpCode.INTERNAL_SERVER_ERROR,
    message = DEFAULT_MESSAGE,
  } = {}) {
    super(message);
    this.status = status;
    this.name = ExceptionName.HTTP_ERROR;
  }
}

export { HttpError };
