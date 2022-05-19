import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRoute } from '~/common/enums/enums';
import { BoardButton } from './components/board-button';

export const Board: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleReturn = (): void => {
    navigate(AppRoute.MAIN);
  };

  return (
    <>
      <h1>You are on page {id}</h1>
      <BoardButton title={'Back to Main Page'} onClick={handleReturn} />
    </>
  );
};
