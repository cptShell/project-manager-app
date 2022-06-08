import { Middleware } from '@reduxjs/toolkit';
import { ExceptionName } from '~/common/enums/enums';
import { AppDispatch } from '~/common/types/types';
import { auth as authActions, app as appActions } from '~/store/actions';

type HandleErrorParams = {
  dispatch: AppDispatch,
};

const handleError: Middleware =
  ({ dispatch }: HandleErrorParams) =>
    (next) =>
      (action): void => {
        if (action.error) {
          const { error } = action;

          if (error) {
            const { message, name } = error;

            if (name === ExceptionName.UNAUTHORIZED) {
              dispatch(authActions.signOut());
              return;
            }
            dispatch(appActions.notify({ message: message, type: 'error' }));
          }
        }
        return next(action);
      };
export { handleError };
