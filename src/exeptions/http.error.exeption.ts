import { ExceptionName, HttpCode } from '~/common/enums/enums';

const DEFAULT_MESSAGE = 'unauthorized';

class HttpError extends Error {
  status: HttpCode;

  constructor({
    status = HttpCode.UNAUTHORIZED,
    message = DEFAULT_MESSAGE,
    name = ExceptionName.HTTP_ERROR,
  } = {}) {
    super(message);
    this.status = status;
    this.name = name;
  }
}

export { HttpError };
