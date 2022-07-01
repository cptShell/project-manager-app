import { createReducer } from '@reduxjs/toolkit';
import { ColumnDto } from '~/common/types/types';
import { getAll, createColumn, update, removeColumn } from './actions';

type State = {
  columns: Array<ColumnDto>;
};

const initialState: State = { columns: [] };

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getAll.fulfilled, (state, action) => {
    state.columns = action.payload;
  });
  builder.addCase(createColumn.fulfilled, (state, action) => {
    state.columns = [...state.columns, action.payload];
  });
  builder.addCase(update.fulfilled, (state, action) => {
    const targetColumn = state.columns.find((columns) => {
      return action.payload.id === columns.id;
    });
    if (targetColumn) {
      targetColumn.title = action.payload.title;
      targetColumn.order = action.payload.order;
    }
  });
  builder.addCase(removeColumn.fulfilled, (state, action) => {
    const { columnId } = action.meta.arg;
    const index = state.columns.findIndex((column) => column.id === columnId);
    if (index !== -1) {
      state.columns.splice(index, 1);
    }
  });
});
