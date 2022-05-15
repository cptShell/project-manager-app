import { Middleware } from '@reduxjs/toolkit';

const handleError: Middleware =
  () =>
  (next) =>
  (action): void => {
    if (action.error) {
      const { error } = action;

      if (error) {
        const { message } = error;
        alert(message);
      }
    }
    return next(action);
  };
export { handleError };
