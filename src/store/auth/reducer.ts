import { createReducer } from '@reduxjs/toolkit';
import { signIn } from './actions';

type State = {
  // user
};

const initialState: State = {};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(signIn.fulfilled, (/*state, action*/) => {
    // state.user = action.payload;
  });
});
