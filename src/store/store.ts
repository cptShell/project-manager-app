import { configureStore } from '@reduxjs/toolkit';
import { authApi, boardApi, storage } from '~/services/services';
import { rootReducer } from './root-reducer';

export const extraArgument = {
  authApi,
  storage,
  boardApi,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: { extraArgument },
    });
  },
});
