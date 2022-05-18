import { ContentType, HttpMethod, UserApiPath } from '~/common/enums/enums';
import { SignInUserDto, UserDto } from '~/common/types/types';
import { Http } from '~/services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

type EditUserDto = {
  payload: SignInUserDto;
  userId: string;
};

export class UserApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  editUser({ payload, userId }: EditUserDto): Promise<UserDto> {
    const userPath = `/${userId}`;

    return this.#http.load(
      `${this.#apiPrefix}${UserApiPath.USERS}${userPath}`,
      {
        method: HttpMethod.PUT,
        hasAuth: true,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }

  deleteUser(userId: string): Promise<void> {
    const userPath = `/${userId}`;

    return this.#http.load(
      `${this.#apiPrefix}${UserApiPath.USERS}${userPath}`,
      {
        method: HttpMethod.DELETE,
        hasAuth: true,
      },
    );
  }
}
