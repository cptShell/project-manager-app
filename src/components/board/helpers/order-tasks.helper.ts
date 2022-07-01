import update from 'immutability-helper';
import { FullColumnDto, TaskDto } from '~/common/types/types';

export const orderTasks = (
  columns: Array<FullColumnDto>,
  targetIndex: number,
): Array<FullColumnDto> => {
  const tasks = columns[targetIndex].tasks;
  const orderedTasks = tasks.reduce((result, task, targetIndex) => {
    const newTask: TaskDto = { ...task, order: targetIndex + 1 };
    return result.concat(newTask);
  }, <Array<TaskDto>>[]);

  return update(columns, {
    [targetIndex]: {
      tasks: {
        $set: orderedTasks,
      },
    },
  });
};
