import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, NotificationPayload } from '~/common/types/types';
import { ActionType } from './common';

export const notify = createAsyncThunk<void, NotificationPayload, AsyncThunkConfig>(
  ActionType.NOTIFY,
  async (payload, { extra }) => {
    const { notification } = extra;
    notification.showMessage(payload);
  },
);
