import { FC } from 'react';
import { FormattedMessage } from '../common/common';
import { BoardCreatingForm } from './components/board-creating-form';

export const Main: FC = () => {
  return (
    <>
      <FormattedMessage as={'span'} message="main.title" />
      <BoardCreatingForm />
    </>
  );
};
