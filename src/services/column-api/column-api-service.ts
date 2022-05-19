import {
  BoardPath,
  ColumnPath,
  ContentType,
  HttpMethod,
} from '~/common/enums/enums';
import { CreateColumnDto, CreateColumnResponseDto } from '~/common/types/types';
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

  create(
    payload: CreateColumnDto,
    id: string,
  ): Promise<CreateColumnResponseDto> {
    const path = `/${id}`;
    return this.#http.load(
      `${this.#apiPrefix}${BoardPath.ROOT}${path}${ColumnPath.ROOT}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }

  getAll(id: string): Promise<Array<CreateColumnResponseDto>> {
    const path = `/${id}`;
    return this.#http.load(
      `${this.#apiPrefix}${BoardPath.ROOT}${path}${ColumnPath.ROOT}`,
    );
  }

  getById(boardId: string, columnId: string): Promise<CreateColumnResponseDto> {
    const boardPath = `/${boardId}`;
    const columnPath = `/${columnId}`;
    return this.#http.load(
      `${this.#apiPrefix}${BoardPath.ROOT}${boardPath}${
        ColumnPath.ROOT
      }${columnPath}`,
    );
  }

  delete(boardId: string, columnId: string): Promise<void> {
    const boardPath = `/${boardId}`;
    const columnPath = `/${columnId}`;
    return this.#http.load(
      `${this.#apiPrefix}${BoardPath.ROOT}${boardPath}${
        ColumnPath.ROOT
      }${columnPath}`,
      {
        method: HttpMethod.DELETE,
      },
    );
  }

  update(boardId: string, {
    id,
    title,
    order,
  }: CreateColumnResponseDto): Promise<CreateColumnResponseDto> {
    const boardPath = `/${boardId}`;
    const columnPath = `/${id}`;
    return this.#http.load(
      `${this.#apiPrefix}${BoardPath.ROOT}${boardPath}${
        ColumnPath.ROOT
      }${columnPath}`,
      {
        method: HttpMethod.PUT,
        contentType: ContentType.JSON,
        payload: JSON.stringify({ title, order }),
      },
    );
  }
}
