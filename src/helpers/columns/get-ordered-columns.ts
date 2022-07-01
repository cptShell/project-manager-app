import { FullColumnDto } from '~/common/types/types';

export const getOrderedColumns = (
  columns: Array<FullColumnDto>,
): Array<FullColumnDto> => {
  const clonedColumns = [...columns];

  clonedColumns.sort((columnA, columnB) => {
    return columnA.order - columnB.order;
  });
  clonedColumns.forEach((column) => {
    column.tasks.sort((taskA, taskB) => taskA.order - taskB.order);
  });

  return clonedColumns;
};
