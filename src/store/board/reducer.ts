import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from '~/common/enums/enums';
import { BoardDto, FullBoardDto } from '~/common/types/types';
import { createColumn, removeColumn } from '../column/actions';
import { createTask, removeTask } from '../task/actions';
import {
  getAll,
  create,
  update,
  getById,
  removeBoard,
  reset,
  updateColumns,
} from './actions';

type State = {
  boards: Array<BoardDto>;
  currentBoard: FullBoardDto | null;
  currentBoardStatus: DataStatus;
};

const initialState: State = {
  boards: [],
  currentBoard: null,
  currentBoardStatus: DataStatus.IDLE,
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getAll.fulfilled, (state, action) => {
    state.boards = action.payload;
  });

  builder.addCase(getById.fulfilled, (state, action) => {
    state.currentBoardStatus = DataStatus.FULFILLED;

    state.currentBoard = action.payload;
  });

  builder.addCase(getById.rejected, (state) => {
    state.currentBoardStatus = DataStatus.REJECTED;
  });

  builder.addCase(getById.pending, (state) => {
    state.currentBoardStatus = DataStatus.PENDING;
  });

  builder.addCase(removeBoard.fulfilled, (state, action) => {
    const { payload: id } = action;
    const index = state.boards.findIndex((board) => board.id === id);
    if (index !== -1) {
      state.boards.splice(index, 1);
    }
  });

  builder.addCase(removeColumn.fulfilled, (state, action) => {
    const { columnId } = action.meta.arg;
    const { currentBoard } = state;
    if (currentBoard) {
      const index = currentBoard.columns.findIndex(
        (column) => column.id === columnId,
      );
      if (index !== -1) {
        currentBoard.columns.splice(index, 1);
      }
    }
  });

  builder.addCase(removeTask.fulfilled, (state, action) => {
    const { taskId, columnId } = action.meta.arg;
    const { currentBoard } = state;
    if (currentBoard) {
      const currentColumn = currentBoard.columns.find(
        (column) => column.id === columnId,
      );
      if (currentColumn) {
        const taskIndex = currentColumn.tasks?.findIndex(
          (task) => task.id === taskId,
        );
        if (taskIndex !== -1) {
          currentColumn.tasks.splice(taskIndex, 1);
        }
      }
    }
  });

  builder.addCase(create.fulfilled, (state, action) => {
    state.boards = [...state.boards, action.payload];
  });

  builder.addCase(createColumn.fulfilled, (state, action) => {
    state.currentBoard?.columns.push(action.payload);
  });

  builder.addCase(createTask.fulfilled, (state, action) => {
    const { columnId } = action.meta.arg;
    const { currentBoard } = state;
    if (currentBoard) {
      const currentColumn = currentBoard.columns.find(
        (column) => column.id === columnId,
      );
      currentColumn?.tasks.push(action.payload);
    }
  });
  builder.addCase(update.fulfilled, (state, action) => {
    const targetBoard = state.boards.find((board) => {
      return action.payload.id === board.id;
    });
    if (targetBoard) {
      targetBoard.title = action.payload.title;
    }
  });
  builder.addCase(reset, (state) => {
    state.currentBoard = null;
  });

  builder.addCase(updateColumns.fulfilled, (state, action) => {
    if (state.currentBoard) {
      state.currentBoard.columns = action.payload;
    }
  });
});
