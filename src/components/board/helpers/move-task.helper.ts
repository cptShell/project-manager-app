import { DraggableLocation } from 'react-beautiful-dnd';
import update from 'immutability-helper';
import { FullColumnDto, UpdateTaskDto } from '~/common/types/types';
import { TaskUpdatePayload } from '~/store/task/common';
import { orderTasks } from './order-tasks.helper';

export const moveTask = (
  columns: Array<FullColumnDto>,
  boardId: string,
  source: DraggableLocation,
  target: DraggableLocation,
): [Array<FullColumnDto>, TaskUpdatePayload | null] => {
  const sourceId = source.droppableId;
  const targetId = target.droppableId;
  const sourceIndex = columns.findIndex((column) => column.id === sourceId);
  const targetIndex = columns.findIndex((column) => column.id === targetId);
  const sourceColumn = columns[sourceIndex];
  const sourceTask = sourceColumn.tasks[source.index];
  const targetTask = sourceColumn.tasks[target.index];

  if (!targetTask || !sourceTask) {
    return [columns, null];
  }

  let updatedColumns: Array<FullColumnDto>;

  if (sourceIndex !== targetIndex) {
    updatedColumns = update(columns, {
      [sourceIndex]: {
        tasks: { $splice: [[source.index, 1]] },
      },
      [targetIndex]: {
        tasks: { $splice: [[target.index, 0, sourceTask]] },
      },
    });
  } else {
    updatedColumns = update(columns, {
      [sourceIndex]: {
        tasks: {
          $splice: [
            [source.index, 1],
            [target.index, 0, sourceTask],
          ],
        },
      },
    });
  }

  const indexes = [sourceIndex, targetIndex];

  const result = indexes.reduce(
    (acc, index) => orderTasks(acc, index),
    updatedColumns,
  );

  const updateTaskResponseDto: UpdateTaskDto = {
    title: sourceTask.title,
    description: sourceTask.description,
    order: targetTask.order,
    userId: sourceTask.userId,
    columnId: targetId,
    boardId,
  };

  const taskResponse: TaskUpdatePayload = {
    columnId: sourceId,
    taskId: sourceTask.id,
    updateTaskResponseDto,
    boardId,
  };

  return [result, taskResponse];
};
