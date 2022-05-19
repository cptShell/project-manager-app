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
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
  }

  getAll(): Promise<Array<CreateBoardResponseDto>> {
    return this.#http.load(`${this.#apiPrefix}${BoardPath.ROOT}`);
  }

  getById(id: string): Promise<CreateBoardResponseDto> {
    const path = `/${id}`;
    return this.#http.load(`${this.#apiPrefix}${BoardPath.ROOT}${path}`);
  }

  delete(id: string): Promise<void> {
    const path = `/${id}`;
    return this.#http.load(`${this.#apiPrefix}${BoardPath.ROOT}${path}`, {
      method: HttpMethod.DELETE,
    });
  }

  update({
    id,
    title,
  }: CreateBoardResponseDto): Promise<CreateBoardResponseDto> {
    const path = `/${id}`;
    return this.#http.load(`${this.#apiPrefix}${BoardPath.ROOT}${path}`, {
      method: HttpMethod.PUT,
      contentType: ContentType.JSON,
      payload: JSON.stringify({ title }),
    });
  }
}
