import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  CreateColumnDto,
  ColumnDto,
  FullColumnDto,
  ColumnResponse,
} from '~/common/types/types';
import { ActionType } from './common';

type ColumnCreatePayload = {
  id: string;
  createColumnDto: CreateColumnDto;
};

type ColumnIdPayload = {
  boardId: string;
  columnId: string;
};

export const createColumn = createAsyncThunk<
  FullColumnDto,
  ColumnCreatePayload,
  AsyncThunkConfig
>(ActionType.CREATE, async ({ id, createColumnDto }, { extra }) => {
  const { columnApi } = extra;
  const response = await columnApi.create(id, createColumnDto);
  return { ...response, tasks: [] };
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
  const result = await Promise.all(
    response.map(({ id: columnId }) => {
      const columnResponse = columnApi.getById(id, columnId);
      return columnResponse;
    }),
  );
  return result;
});

export const getById = createAsyncThunk<
  FullColumnDto,
  ColumnIdPayload,
  AsyncThunkConfig
>(ActionType.GET_BY_ID, async ({ boardId, columnId }, { extra }) => {
  const { columnApi } = extra;
  const response = await columnApi.getById(boardId, columnId);
  return response;
});

export const removeColumn = createAsyncThunk<
  void,
  ColumnIdPayload,
  AsyncThunkConfig
>(ActionType.DELETE, async ({ boardId, columnId }, { extra }) => {
  const { columnApi } = extra;
  await columnApi.delete(boardId, columnId);
});
