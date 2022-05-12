import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { StorageKey, UserActions } from '~/common/enums/enums';
import {
  AsyncThunkConfig,
  SignInUserDto,
  SignUpResponseDto,
  SignUpUserDto,
} from '~/common/types/types';
import { ActionType } from './common';

export const addUser = createAction<SignUpResponseDto>(UserActions.ADD);

export const removeUser = createAction(UserActions.REMOVE);

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
    const { authApi, storage } = extra;
    const { login, password } = payload;

    try {
      const signUpResponseDto = await authApi.signUp(payload);
      dispatch(addUser(signUpResponseDto));
      storage.setItem(StorageKey.USER, JSON.stringify(signUpResponseDto));

      return dispatch(signIn({ login, password }));
    } catch (error) {
      console.log(error);
    }
  },
);
