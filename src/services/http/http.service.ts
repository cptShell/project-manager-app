import {
  HttpMethod,
  ContentType,
  HttpHeader,
  StorageKey,
} from 'common/enums/enums';
import { Storage } from '../storage/storage.service';

type Constructor = {
  storage: Storage;
};

type HttpOptions = {
  method: HttpMethod;
  contentType: ContentType;
  payload: BodyInit | null;
  hasAuth: boolean;
};

export class Http {
  #storage: Storage;

  constructor({ storage }: Constructor) {
    this.#storage = storage;
  }

  load<T = unknown>(
    url: string,
    options: Partial<HttpOptions> = {},
  ): Promise<T> {
    const {
      method = HttpMethod.GET,
      contentType,
      payload = null,
      hasAuth = true,
    } = options;

    const headers = this.getHeaders(contentType, hasAuth);

    return fetch(url, {
      method,
      body: payload,
      headers,
    })
      .then(this.checkStatus)
      .then((res) => this.parseJSON<T>(res));
  }

  private getHeaders(contentType?: ContentType, hasAuth?: boolean): Headers {
    const headers = new Headers();

    if (contentType) {
      headers.append(HttpHeader.CONTENT_TYPE, contentType);
    }

    if (hasAuth) {
      const token = this.#storage.getItem(StorageKey.TOKEN);

      if (token) {
        headers.append(HttpHeader.AUTHORIZATION, `Bearer ${token}`);
      }
    }

    return headers;
  }

  private async checkStatus(response: Response): Promise<Response> {
    if (!response.ok) {
      const parsedException = await response.json().catch(() => ({
        message: response?.statusText,
      }));

      throw new Error(parsedException);
    }

    return response;
  }

  private parseJSON<T>(response: Response): Promise<T> {
    return response.json();
  }
}
