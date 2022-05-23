import { ApiPath, ContentType, HttpMethod } from '~/common/enums/enums';
import { CreateBoardDto, BoardDto } from '~/common/types/types';
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

  create(payload: CreateBoardDto): Promise<BoardDto> {
    return this.#http.load(`${this.#apiPrefix}${ApiPath.BOARDS}`, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
  }

  getAll(): Promise<Array<BoardDto>> {
    return this.#http.load(`${this.#apiPrefix}${ApiPath.BOARDS}`);
  }

  getById(id: string): Promise<BoardDto> {
    const path = `/${id}`;
    return this.#http.load(`${this.#apiPrefix}${ApiPath.BOARDS}${path}`);
  }

  delete(id: string): Promise<void> {
    const path = `/${id}`;
    return this.#http.load(`${this.#apiPrefix}${ApiPath.BOARDS}${path}`, {
      method: HttpMethod.DELETE,
    });
  }

  update({ id, title, description }: BoardDto): Promise<BoardDto> {
    const path = `/${id}`;
    return this.#http.load(`${this.#apiPrefix}${ApiPath.BOARDS}${path}`, {
      method: HttpMethod.PUT,
      contentType: ContentType.JSON,
      payload: JSON.stringify({ title, description }),
    });
  }
}
