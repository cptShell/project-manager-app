import { ApiPath, ContentType, HttpMethod } from '~/common/enums/enums';
import { CreateTaskDto, TaskDto } from '~/common/types/types';
import { Http } from '~/services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

export class TaskApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  create(
    boardId: string,
    columnId: string,
    payload: CreateTaskDto,
  ): Promise<TaskDto> {
    const path = `${ApiPath.$BOARD_ID_COLUMN_ID_TASK}`
      .replace(':boardId', boardId)
      .replace(':columnId', columnId);
    return this.#http.load(`${this.#apiPrefix}${path}`, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
  }

  getAll(boardId: string, columnId: string): Promise<Array<TaskDto>> {
    const path = `${ApiPath.$BOARD_ID_COLUMN_ID_TASK}`
      .replace(':boardId', boardId)
      .replace(':columnId', columnId);
    return this.#http.load(`${this.#apiPrefix}${path}`);
  }

  getById(boardId: string, columnId: string, taskId: string): Promise<TaskDto> {
    const path = `${ApiPath.$BOARD_ID_COLUMN_ID_TASK}/${taskId}`
      .replace(':boardId', boardId)
      .replace(':columnId', columnId);
    return this.#http.load(`${this.#apiPrefix}${path}`);
  }

  delete(boardId: string, columnId: string, taskId: string): Promise<void> {
    const path = `${ApiPath.$BOARD_ID_COLUMN_ID_TASK}/${taskId}`
      .replace(':boardId', boardId)
      .replace(':columnId', columnId);
    return this.#http.load(`${this.#apiPrefix}${path}`, {
      method: HttpMethod.DELETE,
    });
  }

  update(
    boardId: string,
    columnId: string,
    { id: taskId, title, order, description, userId }: TaskDto,
  ): Promise<TaskDto> {
    const path = `${ApiPath.$BOARD_ID_COLUMN_ID_TASK}/${taskId}`
      .replace(':boardId', boardId)
      .replace(':columnId', columnId);
    return this.#http.load(`${this.#apiPrefix}${path}`, {
      method: HttpMethod.PUT,
      contentType: ContentType.JSON,
      payload: JSON.stringify({
        title,
        order,
        description,
        userId,
        boardId,
        columnId,
      }),
    });
  }
}
