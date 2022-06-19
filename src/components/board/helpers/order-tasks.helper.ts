import update from 'immutability-helper';
import { FullColumnDto } from '~/common/types/types';

export const orderTasks = (
  columns: Array<FullColumnDto>,
  targetIndex: number,
): Array<FullColumnDto> => {
  const tasks = columns[targetIndex].tasks;
  const orderedTasks = tasks.reduce((result, _, targetIndex) => {
    return update(result, {
      [targetIndex]: { order: { $set: targetIndex + 1 } },
    });
  }, tasks);

  return update(columns, {
    [targetIndex]: {
      tasks: {
        $set: orderedTasks,
      },
    },
  });
};
