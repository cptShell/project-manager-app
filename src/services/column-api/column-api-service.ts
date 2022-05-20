import { ApiPath, ContentType, HttpMethod } from '~/common/enums/enums';
import { CreateColumnDto, ColumnDto } from '~/common/types/types';
import { Http } from '~/services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

export class ColumnApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  create(id: string, payload: CreateColumnDto): Promise<ColumnDto> {
    const path = `${ApiPath.$BOARD_ID_COLUMN}`.replace(':boardId', id);
    return this.#http.load(`${this.#apiPrefix}${path}`, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
  }

  getAll(id: string): Promise<Array<ColumnDto>> {
    const path = `${ApiPath.$BOARD_ID_COLUMN}`.replace(':boardId', id);
    return this.#http.load(`${this.#apiPrefix}${path}`);
  }

  getById(boardId: string, columnId: string): Promise<ColumnDto> {
    const path = `${ApiPath.$BOARD_ID_COLUMN}/${columnId}`.replace(
      ':boardId',
      boardId,
    );
    return this.#http.load(`${this.#apiPrefix}${path}`);
  }

  delete(boardId: string, columnId: string): Promise<void> {
    const path = `${ApiPath.$BOARD_ID_COLUMN}/${columnId}`.replace(
      ':boardId',
      boardId,
    );
    return this.#http.load(`${this.#apiPrefix}${path}`, {
      method: HttpMethod.DELETE,
    });
  }

  update(
    boardId: string,
    { id: columnId, title, order }: ColumnDto,
  ): Promise<ColumnDto> {
    const path = `${ApiPath.$BOARD_ID_COLUMN}/${columnId}`.replace(
      ':boardId',
      boardId,
    );
    return this.#http.load(`${this.#apiPrefix}${path}`, {
      method: HttpMethod.PUT,
      contentType: ContentType.JSON,
      payload: JSON.stringify({ title, order }),
    });
  }
}
