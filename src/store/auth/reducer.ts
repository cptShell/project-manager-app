import { createReducer } from '@reduxjs/toolkit';
import { signIn } from './actions';

type State = {
  token: string;
};

const initialState: State = {
  token: '',
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(signIn.fulfilled, (state, action) => {
    state.token = action.payload;
  });
});
