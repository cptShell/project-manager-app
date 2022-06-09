import { createReducer } from '@reduxjs/toolkit';
import { UserDto } from '~/common/types/types';
import { getUsers } from '../user/actions';

type State = {
  registeredUsers: Array<UserDto>;
};

const initialState: State = {
  registeredUsers: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getUsers.fulfilled, (state, action) => {
    state.registeredUsers = action.payload;
  });
});
