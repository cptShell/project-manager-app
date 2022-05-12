import { CustomExceptionName, ErrorCode } from '~/common/enums/enums';

const DEFAULT_MESSAGE = 'network error';

class HttpError extends Error {
  status: ErrorCode;

  constructor({
    status = ErrorCode.INTERNAL_SERVER_ERROR,
    message = DEFAULT_MESSAGE,
    name = CustomExceptionName.HTTP_ERROR,
  } = {}) {
    super(message);
    this.status = status;
    this.name = name;
  }
}

export { HttpError };
