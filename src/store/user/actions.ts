import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, SignUpUserDto, UserDto } from '~/common/types/types';
import { auth as authActions } from '../actions';
import { ActionType } from './common';

type EditUserPayload = {
  user: SignUpUserDto;
  id: string;
};

export const deleteUser = createAsyncThunk<void, string, AsyncThunkConfig>(
  ActionType.DELETE_USER,
  async (payload, { extra, dispatch }) => {
    const { userApi } = extra;

    await userApi.deleteUser(payload);

    await dispatch(authActions.signOut());
  },
);

export const editAuthenticatedUser = createAsyncThunk<
  UserDto,
  EditUserPayload,
  AsyncThunkConfig
>(ActionType.EDIT_AUTHENTICATED_USER, async (payload, { extra }) => {
  const { user, id } = payload;
  const { userApi } = extra;

  const editUserPayload = {
    payload: user,
    userId: id,
  };

  const editedUser = await userApi.editUser(editUserPayload);
  return editedUser;
});

export const getUsers = createAsyncThunk<
  Array<UserDto>,
  void,
  AsyncThunkConfig
>(ActionType.GET_USERS, async (_payload, { extra }) => {
  const { userApi } = extra;

  const users = await userApi.getUsers();
  return users;
});
