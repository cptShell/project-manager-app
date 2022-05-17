import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  CreateBoardDto,
  CreateBoardResponseDto,
} from '~/common/types/types';
import { ActionType } from './common';

export const create = createAsyncThunk<
  CreateBoardResponseDto,
  CreateBoardDto,
  AsyncThunkConfig
>(ActionType.CREATE, async (payload, { extra }) => {
  const { boardApi } = extra;

  const response = await boardApi.create(payload);
  return response;
});
