import { configureStore } from '@reduxjs/toolkit';
import { authApi, storage } from '~/services/services';
import { handleError } from './middlewares/middlewares';
import { rootReducer } from './root-reducer';

export const extraArgument = {
  authApi,
  storage,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: { extraArgument },
    }).concat(handleError);
  },
});
