import { CreateTaskDto, TaskDto, UpdateTaskDto } from '~/common/types/types';

export enum ActionType {
  CREATE = 'task/create',
  GET_ALL = 'task/getAll',
  GET_BY_ID = 'task/getById',
  DELETE = 'task/delete',
  UPDATE = 'task/update',
}

export type TaskCreatePayload = {
  boardId: string;
  columnId: string;
  createTaskDto: CreateTaskDto;
};

export type TaskUpdatePayload = {
  boardId: string;
  columnId: string;
  updateTaskResponseDto: UpdateTaskDto;
};

export type TaskResponse = {
  boardId: string;
  columnId: string;
  createTaskResponseDto: TaskDto;
};

export type TaskIdPayload = {
  boardId: string;
  columnId: string;
  taskId: string;
};

export type GetAllPayload = {
  boardId: string;
  columnId: string;
};
