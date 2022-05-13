import { Middleware } from '@reduxjs/toolkit';

const handleError: Middleware =
  () =>
  (next) =>
  (action): void => {
    if (action.error) {
      const { message } = action.error;
      alert(message);
    }
    return next(action);
  };
export { handleError };
