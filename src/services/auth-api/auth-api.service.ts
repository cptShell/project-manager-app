import {
  ApiPath,
  AuthApiPath,
  ContentType,
  HttpMethod,
} from '~/common/enums/enums';
import { SignInUserDto } from '~/common/types/types';
import { Http } from '~/services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

export class AuthApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  signIn(payload: SignInUserDto): Promise<unknown> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.ROOT}${AuthApiPath.SIGN_IN}`,
      {
        method: HttpMethod.POST,
        hasAuth: false,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }
}
