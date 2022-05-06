import { extraArgument } from 'store/store';
import { AppDispatch } from './app-dispatch.type';
import { RootState } from './root-state.type';

export type AsyncThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  extra: typeof extraArgument;
};
