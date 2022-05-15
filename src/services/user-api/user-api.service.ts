import { ContentType, HttpMethod, UserApiPath } from '~/common/enums/enums';
import { SignUpUserDto, UserDto } from '~/common/types/types';
import { Http } from '~/services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

export class UserApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  editUser(payload: SignUpUserDto, userId: string): Promise<UserDto> {
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
}
