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
>(ActionType.EDIT_CURRENT_USER, async (payload, { extra }) => {
  const { user, id } = payload;
  const { userApi } = extra;

  const editedUser = await userApi.editUser(user, id);

  return editedUser;
});
