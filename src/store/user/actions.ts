import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, SignUpUserDto, UserDto } from '~/common/types/types';
import { ActionType } from './common';

type EditUserPayload = {
  user: SignUpUserDto;
  id: string;
};

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
