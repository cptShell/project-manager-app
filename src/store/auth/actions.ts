import { createAsyncThunk } from '@reduxjs/toolkit';
import { StorageKey } from '~/common/enums/enums';
import {
  AsyncThunkConfig,
  SignInUserDto,
  SignUpUserDto,
} from '~/common/types/types';
import { ActionType } from './common';

export const signIn = createAsyncThunk<string, SignInUserDto, AsyncThunkConfig>(
  ActionType.SIGN_IN,
  async (payload, { extra }) => {
    const { authApi, storage } = extra;

    const { token } = await authApi.signIn(payload);
    storage.setItem(StorageKey.TOKEN, token);

    return token;
  },
);

export const signUp = createAsyncThunk<void, SignUpUserDto, AsyncThunkConfig>(
  ActionType.SIGN_UP,
  async (payload, { extra, dispatch }) => {
    const { authApi } = extra;
    const { login, password } = payload;

    await authApi.signUp(payload);

    return dispatch(signIn({ login, password }));
  },
);
