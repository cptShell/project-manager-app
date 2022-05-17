import { FC } from 'react';
import { BoardButton } from './board-button';

type Props = {
  title: string;
};

export const BoardItem: FC<Props> = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
      <BoardButton title={'Add task'} />
    </div>
  );
};
