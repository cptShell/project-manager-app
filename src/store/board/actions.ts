import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  CreateBoardDto,
  CreateBoardResponseDto,
} from '~/common/types/types';
import { ActionType } from './common';

export const create = createAsyncThunk<
  CreateBoardResponseDto,
  CreateBoardDto,
  AsyncThunkConfig
>(ActionType.CREATE, async (payload, { extra }) => {
  const { boardApi } = extra;

  const response = await boardApi.create(payload);
  return response;
});

export const update = createAsyncThunk<
  CreateBoardResponseDto,
  CreateBoardResponseDto,
  AsyncThunkConfig
>(ActionType.UPDATE, async (payload, { extra }) => {
  const { boardApi } = extra;
  const response = await boardApi.update(payload);
  return response;
});

export const getAll = createAsyncThunk<
  Array<CreateBoardResponseDto>,
  void,
  AsyncThunkConfig
>(ActionType.GET_ALL, async (_payload, { extra }) => {
  const { boardApi } = extra;
  const response = await boardApi.getAll();
  return response;
});

export const getById = createAsyncThunk<
  CreateBoardResponseDto,
  string,
  AsyncThunkConfig
>(ActionType.GET_BY_ID, async (payload, { extra }) => {
  const { boardApi } = extra;
  const response = await boardApi.getById(payload);
  return response;
});

export const remove = createAsyncThunk<void, string, AsyncThunkConfig>(
  ActionType.DELETE,
  async (payload, { extra }) => {
    const { boardApi } = extra;
    await boardApi.delete(payload);
  },
);
