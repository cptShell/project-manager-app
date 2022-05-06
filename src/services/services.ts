import { ENV } from 'common/enums/enums';
import { AuthApi } from './auth-api/auth-api.service';
import { Http } from './http/http.service';
import { Storage } from './storage/storage.service';

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
