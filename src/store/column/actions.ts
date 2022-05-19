import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  CreateColumnDto,
  CreateColumnResponseDto,
} from '~/common/types/types';
import { ActionType } from './common';

type ColumnCreatePayload = {
  id: string;
  createColumnDto: CreateColumnDto;
};

type ColumnResponse = {
  boardId: string;
  createColumnResponseDto: CreateColumnResponseDto;
};

type ColumnIdPayload = {
  boardId: string;
  columnId: string;
};

export const create = createAsyncThunk<
  CreateColumnResponseDto,
  ColumnCreatePayload,
  AsyncThunkConfig
>(ActionType.CREATE, async ({ id, createColumnDto }, { extra }) => {
  const { columnApi } = extra;
  const response = await columnApi.create(id, createColumnDto);
  return response;
});

export const update = createAsyncThunk<
  CreateColumnResponseDto,
  ColumnResponse,
  AsyncThunkConfig
>(
  ActionType.UPDATE,
  async ({ boardId, createColumnResponseDto }, { extra }) => {
    const { columnApi } = extra;
    const response = await columnApi.update(boardId, createColumnResponseDto);
    return response;
  },
);

export const getAll = createAsyncThunk<
  Array<CreateColumnResponseDto>,
  string,
  AsyncThunkConfig
>(ActionType.GET_ALL, async (id, { extra }) => {
  const { columnApi } = extra;
  const response = await columnApi.getAll(id);
  return response;
});

export const getById = createAsyncThunk<
  CreateColumnResponseDto,
  ColumnIdPayload,
  AsyncThunkConfig
>(ActionType.GET_BY_ID, async ({ boardId, columnId }, { extra }) => {
  const { columnApi } = extra;
  const response = await columnApi.getById(boardId, columnId);
  return response;
});

export const remove = createAsyncThunk<void, ColumnIdPayload, AsyncThunkConfig>(
  ActionType.DELETE,
  async ({ boardId, columnId }, { extra }) => {
    const { columnApi } = extra;
    await columnApi.delete(boardId, columnId);
  },
);
