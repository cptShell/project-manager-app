import { createReducer } from '@reduxjs/toolkit';
import { CreateBoardResponseDto } from '~/common/types/types';
import { getAll, create, update } from './actions';

type State = {
  boards: Array<CreateBoardResponseDto>;
};

const initialState: State = { boards: [] };

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getAll.fulfilled, (state, action) => {
    state.boards = action.payload;
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
