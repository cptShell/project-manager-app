import { createReducer } from '@reduxjs/toolkit';
import { ColumnDto } from '~/common/types/types';
import { getAll, create, update } from './actions';

type State = {
  columns: Array<ColumnDto>;
};

const initialState: State = { columns: [] };

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getAll.fulfilled, (state, action) => {
    state.columns = action.payload;
  });
  builder.addCase(create.fulfilled, (state, action) => {
    state.columns = [...state.columns, action.payload];
  });
  builder.addCase(update.fulfilled, (state, action) => {
    const targetColumn= state.columns.find((columns) => {
      return action.payload.id === columns.id;
    });
    if (targetColumn) {
      targetColumn.title = action.payload.title;
      targetColumn.order = action.payload.order;
    }
  });
});
