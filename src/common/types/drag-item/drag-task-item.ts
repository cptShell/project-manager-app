import { TaskPosition } from '../task-position/task-position';

export type DragTaskItem = {
  position: TaskPosition;
  id: string;
  type: string;
};
