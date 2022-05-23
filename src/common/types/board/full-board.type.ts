import { FullColumnDto } from '../types';

export type FullBoardDto = {
  id: string;
  title: string;
  description: string;
  columns: Array<FullColumnDto>;
};
