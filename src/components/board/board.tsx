import { FC } from 'react';
import { CreateColumnForm } from './components/column-creating-form';

export const Board: FC = () => {
  return (
    <>
      <div>Board</div>
      <CreateColumnForm />
    </>
  );
};
