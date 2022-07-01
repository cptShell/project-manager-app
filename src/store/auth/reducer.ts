import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from '~/common/enums/enums';
import { UserDto } from '~/common/types/types';
import { editAuthenticatedUser } from '../user/actions';
import { loadAuthenticatedUser, signIn, signOut, signUp } from './actions';

type State = {
  user: UserDto | null;
  userStatus: DataStatus;
};

const initialState: State = {
  user: null,
  userStatus: DataStatus.IDLE,
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(editAuthenticatedUser.fulfilled, (state, action) => {
    state.user = action.payload;
    state.userStatus = DataStatus.FULFILLED;
  });
  builder.addCase(editAuthenticatedUser.pending, (state) => {
    state.userStatus = DataStatus.PENDING;
  });
  builder.addCase(editAuthenticatedUser.rejected, (state) => {
    state.userStatus = DataStatus.REJECTED;
  });
  builder.addCase(signOut.fulfilled, (state) => {
    state.user = null;
    state.userStatus = DataStatus.IDLE;
  });
  builder.addCase(loadAuthenticatedUser.fulfilled, (state, action) => {
    state.user = action.payload;
    state.userStatus = DataStatus.FULFILLED;
  });
  builder.addCase(loadAuthenticatedUser.pending, (state) => {
    state.userStatus = DataStatus.PENDING;
  });
  builder.addCase(loadAuthenticatedUser.rejected, (state) => {
    state.userStatus = DataStatus.REJECTED;
  });
  builder.addCase(signIn.pending, (state) => {
    state.userStatus = DataStatus.PENDING;
  });
  builder.addCase(signUp.pending, (state) => {
    state.userStatus = DataStatus.PENDING;
  });
  builder.addCase(signIn.rejected, (state) => {
    state.userStatus = DataStatus.REJECTED;
  });
  builder.addCase(signUp.rejected, (state) => {
    state.userStatus = DataStatus.REJECTED;
  });
});
