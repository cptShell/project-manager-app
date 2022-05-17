import { createAsyncThunk } from '@reduxjs/toolkit';
import { StorageKey } from '~/common/enums/enums';
import {
  AsyncThunkConfig,
  SignInUserDto,
  UserDto,
  SignUpUserDto,
} from '~/common/types/types';
import { ActionType } from './common';

export const signOut = createAsyncThunk<void, void, AsyncThunkConfig>(
  ActionType.SIGN_OUT,
  async (_payload, { extra }) => {
    const { storage } = extra;

    storage.remove(StorageKey.TOKEN);
  },
);

export const loadAuthenticatedUser = createAsyncThunk<
  UserDto,
  void,
  AsyncThunkConfig
>(ActionType.LOAD_CURRENT_USER, async (_payload, { extra }) => {
  const { authApi } = extra;

  const user = await authApi.getAuthenticatedUser();

  return user;
});

export const signIn = createAsyncThunk<void, SignInUserDto, AsyncThunkConfig>(
  ActionType.SIGN_IN,
  async (payload, { extra, dispatch }) => {
    const { authApi, storage } = extra;

    const { token } = await authApi.signIn(payload);
    storage.setItem(StorageKey.TOKEN, token);

    dispatch(loadAuthenticatedUser());
  },
);

export const signUp = createAsyncThunk<void, SignUpUserDto, AsyncThunkConfig>(
  ActionType.SIGN_UP,
  async (payload, { extra, dispatch }) => {
    const { authApi } = extra;
    const { login, password } = payload;

    await authApi.signUp(payload);

    dispatch(signIn({ login, password }));
  },
);
