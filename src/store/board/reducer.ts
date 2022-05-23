import { createReducer } from '@reduxjs/toolkit';
import { BoardDto } from '~/common/types/types';
import { getAll, create, update, remove } from './actions';

type State = {
  boards: Array<BoardDto>;
};

const initialState: State = { boards: [] };

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getAll.fulfilled, (state, action) => {
    state.boards = action.payload;
  });
  builder.addCase(remove.fulfilled, (state, action) => {
    const { payload: id } = action;
    const index = state.boards.findIndex((board) => board.id === id);
    if (index !== -1) {
      state.boards.splice(index, 1);
    }
  });
  builder.addCase(create.fulfilled, (state, action) => {
    state.boards = [...state.boards, action.payload];
  });
  builder.addCase(update.fulfilled, (state, action) => {
    const targetBoard = state.boards.find((board) => {
      return action.payload.id === board.id;
    });
    if (targetBoard) {
      targetBoard.title = action.payload.title;
    }
  });
});
