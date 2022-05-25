import { TaskDto } from '../types';

export type FullColumnDto = {
  id: string;
  title: string;
  order: number;
  tasks: Array<TaskDto>;
};
