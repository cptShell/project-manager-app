import { reducer as auth } from './auth/reducer';
import { reducer as boards } from './board/reducer';
import { reducer as column } from './column/reducer';

export const rootReducer = {
  auth,
  boards,
  column,
};
