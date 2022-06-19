import { DraggableLocation } from 'react-beautiful-dnd';
import update from 'immutability-helper';
import { ColumnResponse, FullColumnDto } from '~/common/types/types';

export const moveColumn = (
  columns: Array<FullColumnDto>,
  boardId: string,
  source: DraggableLocation,
  destination: DraggableLocation,
): [Array<FullColumnDto>, ColumnResponse] => {
  const targetColumn = columns[destination.index];
  const sourceColumn = columns[source.index];

  const newColumns = update(columns, {
    $splice: [
      [source.index, 1],
      [destination.index, 0, sourceColumn],
    ],
  });

  const result = newColumns.reduce((result, _, index) => {
    return update(result, {
      [index]: {
        order: { $set: index + 1 },
      },
    });
  }, newColumns);

  const createColumnResponseDto = {
    ...sourceColumn,
    order: targetColumn.order,
  };
  const payload: ColumnResponse = { boardId, createColumnResponseDto };

  return [result, payload];
};
