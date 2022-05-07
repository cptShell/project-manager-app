import { createAsyncThunk } from '@reduxjs/toolkit';
import { StorageKey } from '~/common/enums/enums';
import { AsyncThunkConfig, SignInUserDto } from '~/common/types/types';
import { ActionType } from './common';

export const signIn = createAsyncThunk<void, SignInUserDto, AsyncThunkConfig>(
  ActionType.SIGN_IN,
  async (payload, { extra }) => {
    const { authApi, storage } = extra;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { user, token }: any = await authApi.signIn(payload);
    storage.setItem(StorageKey.TOKEN, token);

    return user;
  },
);
