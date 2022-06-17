import { DraggableLocation } from 'react-beautiful-dnd';
import { ColumnResponse, FullColumnDto } from '~/common/types/types';
import update from 'immutability-helper';

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

  const createColumnResponseDto = {
    ...sourceColumn,
    order: targetColumn.order,
  };
  const payload: ColumnResponse = { boardId, createColumnResponseDto };

  return [newColumns, payload];
};
