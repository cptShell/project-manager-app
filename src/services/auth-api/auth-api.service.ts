import {
  ApiPath,
  AuthApiPath,
  ContentType,
  HttpMethod,
} from '~/common/enums/enums';
import { SignInUserDto, SignUpUserDto } from '~/common/types/types';
import { Http } from '~/services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

type SingIn = {
  token: string;
};

type SignUp = {
  id: string;
  name: string;
  login: string;
};

export class AuthApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  signIn(payload: SignInUserDto): Promise<SingIn> {
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

  signUp(payload: SignUpUserDto): Promise<SignUp> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.ROOT}${AuthApiPath.SIGN_UP}`,
      {
        method: HttpMethod.POST,
        hasAuth: false,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }
}
