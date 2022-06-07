import { ENV } from '~/common/enums/enums';
import { AuthApi } from './auth-api/auth-api.service';
import { Http } from './http/http.service';
import { Storage } from './storage/storage.service';
import { Internationalization } from './internationalization/internationalization.service';
import { BoardApi } from './board-api/board-api.service';
import { UserApi } from './user-api/user-api.service';
import { ColumnApi } from './column-api/column-api-service';
import { TaskApi } from './task-api/task-api-service';
import { Notification } from './toast-api/notification.service';

export const storage = new Storage({
  storage: localStorage,
});

export const http = new Http({
  storage,
});

export const authApi = new AuthApi({
  http,
  apiPrefix: ENV.API_PATH,
});

export const boardApi = new BoardApi({
  http,
  apiPrefix: ENV.API_PATH,
});

export const columnApi = new ColumnApi({
  http,
  apiPrefix: ENV.API_PATH,
});

export const taskApi = new TaskApi({
  http,
  apiPrefix: ENV.API_PATH,
});

export const userApi = new UserApi({
  http,
  apiPrefix: ENV.API_PATH,
});

export const internationalization = new Internationalization();
export const notification = new Notification();
