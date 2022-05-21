import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  CreateColumnDto,
  ColumnDto,
} from '~/common/types/types';
import { ActionType } from './common';

type ColumnCreatePayload = {
  id: string;
  createColumnDto: CreateColumnDto;
};

type ColumnResponse = {
  boardId: string;
  createColumnResponseDto: ColumnDto;
};

type ColumnIdPayload = {
  boardId: string;
  columnId: string;
};

export const create = createAsyncThunk<
  ColumnDto,
  ColumnCreatePayload,
  AsyncThunkConfig
>(ActionType.CREATE, async ({ id, createColumnDto }, { extra }) => {
  const { columnApi } = extra;
  const response = await columnApi.create(id, createColumnDto);
  return response;
});

export const update = createAsyncThunk<
  ColumnDto,
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
  Array<ColumnDto>,
  string,
  AsyncThunkConfig
>(ActionType.GET_ALL, async (id, { extra }) => {
  const { columnApi } = extra;
  const response = await columnApi.getAll(id);
  return response;
});

export const getById = createAsyncThunk<
  ColumnDto,
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
