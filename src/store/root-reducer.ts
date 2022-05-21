import { reducer as auth } from './auth/reducer';
import { reducer as boards } from './board/reducer';

export const rootReducer = {
  auth,
  boards,
};
