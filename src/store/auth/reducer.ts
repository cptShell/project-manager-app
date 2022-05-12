import { createReducer } from '@reduxjs/toolkit';
import { SignUpResponseDto } from '~/common/types/types';
import { addUser, signIn, removeUser } from './actions';

type State = {
  user: SignUpResponseDto | null;
  token: string;
};

const initialState: State = {
  user: null,
  token: '',
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(signIn.fulfilled, (state, action) => {
    state.token = action.payload;
  });
  builder.addCase(addUser, (state, action) => {
    state.user = action.payload;
  });
  builder.addCase(removeUser, (state) => {
    state.user = null;
    state.token = '';
  });
});
