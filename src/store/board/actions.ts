import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  CreateBoardDto,
  BoardDto,
  FullBoardDto,
} from '~/common/types/types';
import { ActionType } from './common';

export const create = createAsyncThunk<
  BoardDto,
  CreateBoardDto,
  AsyncThunkConfig
>(ActionType.CREATE, async (payload, { extra }) => {
  const { boardApi } = extra;

  const response = await boardApi.create(payload);
  return response;
});

export const update = createAsyncThunk<BoardDto, BoardDto, AsyncThunkConfig>(
  ActionType.UPDATE,
  async (payload, { extra }) => {
    const { boardApi } = extra;
    const response = await boardApi.update(payload);

    return response;
  },
);

export const getAll = createAsyncThunk<Array<BoardDto>, void, AsyncThunkConfig>(
  ActionType.GET_ALL,
  async (_payload, { extra }) => {
    const { boardApi } = extra;
    const response = await boardApi.getAll();

    return response;
  },
);

export const getById = createAsyncThunk<FullBoardDto, string, AsyncThunkConfig>(
  ActionType.GET_BY_ID,
  async (payload, { extra }) => {
    const { boardApi } = extra;
    const response = await boardApi.getById(payload);
    return response;
  },
);

export const removeBoard = createAsyncThunk<string, string, AsyncThunkConfig>(
  ActionType.DELETE,
  async (payload, { extra }) => {
    const { boardApi } = extra;
    await boardApi.delete(payload);

    return payload;
  },
);

export const reset = createAction(ActionType.RESET);
