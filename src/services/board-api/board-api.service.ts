import { BoardPath, ContentType, HttpMethod } from '~/common/enums/enums';
import { CreateBoardDto, CreateBoardResponseDto } from '~/common/types/types';
import { Http } from '~/services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

export class BoardApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  create(payload: CreateBoardDto): Promise<CreateBoardResponseDto> {
    return this.#http.load(`${this.#apiPrefix}${BoardPath.ROOT}`, {
      method: HttpMethod.POST,
      hasAuth: true,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
  }

  getAll(payload: CreateBoardDto): Promise<CreateBoardResponseDto> {
    return this.#http.load(`${this.#apiPrefix}${BoardPath.ROOT}`, {
      method: HttpMethod.GET,
      hasAuth: true,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
  }
}
