import { TaskDto } from '../types';

export type SearchResultsBoard = {
  taskId: string;
  columnId: string;
  task: TaskDto;
  userId: string;
};
