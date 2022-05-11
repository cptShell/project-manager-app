import { combineReducers } from '@reduxjs/toolkit';
import { reducer as auth } from './auth/reducer';

export const rootReducer = combineReducers({
  auth: auth,
});
