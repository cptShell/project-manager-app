import { DraggableLocation } from 'react-beautiful-dnd';
import update from 'immutability-helper';
import { FullColumnDto, TaskDto, UpdateTaskDto } from '~/common/types/types';
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
  const resultTask: TaskDto = { ...sourceTask, order: target.index + 1 };

  if (!sourceTask) {
    return [columns, null];
  }

  let updatedColumns: Array<FullColumnDto>;

  if (sourceIndex !== targetIndex) {
    updatedColumns = update(columns, {
      [sourceIndex]: {
        tasks: { $splice: [[source.index, 1]] },
      },
      [targetIndex]: {
        tasks: { $splice: [[target.index, 0, resultTask]] },
      },
    });
  } else {
    updatedColumns = update(columns, {
      [sourceIndex]: {
        tasks: {
          $splice: [
            [source.index, 1],
            [target.index, 0, resultTask],
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
  console.log(updatedColumns, result);

  const updateTaskResponseDto: UpdateTaskDto = {
    title: resultTask.title,
    description: resultTask.description,
    order: resultTask.order,
    userId: resultTask.userId,
    columnId: targetId,
    boardId,
  };

  const taskResponse: TaskUpdatePayload = {
    columnId: sourceId,
    taskId: resultTask.id,
    updateTaskResponseDto,
    boardId,
  };

  return [result, taskResponse];
};
