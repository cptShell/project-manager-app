import { configureStore } from '@reduxjs/toolkit';
import {
  authApi,
  storage,
  userApi,
  boardApi,
  columnApi,
  taskApi,
  notification,
} from '~/services/services';
import { handleError } from './middlewares/middlewares';
import { rootReducer } from './root-reducer';

export const extraArgument = {
  authApi,
  storage,
  boardApi,
  userApi,
  columnApi,
  taskApi,
  notification,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: { extraArgument },
    }).concat(handleError);
  },
});
