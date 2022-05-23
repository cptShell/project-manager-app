import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, TaskDto, CreateTaskDto } from '~/common/types/types';
import { ActionType } from './common';

type TaskCreatePayload = {
  boardId: string;
  columnId: string;
  createTaskDto: CreateTaskDto;
};

type TaskResponse = {
  boardId: string;
  columnId: string;
  createTaskResponseDto: TaskDto;
};

type TaskIdPayload = {
  boardId: string;
  columnId: string;
  taskId: string;
};

type GetAllPayload = {
  boardId: string;
  columnId: string;
};

export const createTask = createAsyncThunk<
  TaskDto,
  TaskCreatePayload,
  AsyncThunkConfig
>(
  ActionType.CREATE,
  async ({ boardId, columnId, createTaskDto }, { extra }) => {
    const { taskApi } = extra;
    const response = await taskApi.create(boardId, columnId, createTaskDto);
    return response;
  },
);

export const update = createAsyncThunk<TaskDto, TaskResponse, AsyncThunkConfig>(
  ActionType.UPDATE,
  async ({ boardId, columnId, createTaskResponseDto }, { extra }) => {
    const { taskApi } = extra;
    const response = await taskApi.update(
      boardId,
      columnId,
      createTaskResponseDto,
    );
    return response;
  },
);

export const getAll = createAsyncThunk<
  Array<TaskDto>,
  GetAllPayload,
  AsyncThunkConfig
>(ActionType.GET_ALL, async ({ boardId, columnId }, { extra }) => {
  const { taskApi } = extra;
  const response = await taskApi.getAll(boardId, columnId);
  return response;
});

export const getById = createAsyncThunk<
  TaskDto,
  TaskIdPayload,
  AsyncThunkConfig
>(ActionType.GET_BY_ID, async ({ boardId, columnId, taskId }, { extra }) => {
  const { taskApi } = extra;
  const response = await taskApi.getById(boardId, columnId, taskId);
  return response;
});

export const removeTask = createAsyncThunk<void, TaskIdPayload, AsyncThunkConfig>(
  ActionType.DELETE,
  async ({ boardId, columnId, taskId }, { extra }) => {
    const { taskApi } = extra;
    await taskApi.delete(boardId, columnId, taskId);
  },
);
