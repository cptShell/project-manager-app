import { Middleware } from '@reduxjs/toolkit';

const handleError: Middleware =
  () =>
  (next) =>
  (action): void => {
    if (action.error) {
      const { message } = action.error;
      const customError = JSON.parse(message);
      if (customError.code === 404) {
        alert('User not Found');
      }
    }
    return next(action);
  };
export { handleError };
