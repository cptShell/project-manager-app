import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  column as columnActions,
  board as boardActions,
} from '~/store/actions';
import { AppRoute, DataStatus } from '~/common/enums/enums';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { Button } from './components/button';
import { Modal } from '../common/modal/modal';
import { CreateColumnForm } from './components/column-creating-form';
import { ConfirmationModal } from '../common/confirmation-modal/confirmation-modal';
import { Column } from './components/column';
import { Header } from '../common/common';
import { NotFound } from '../not-found-page/not-found-page';
import { Loader } from '../common/loader/loader';
import styles from './styles.module.scss';

export const Board: FC = () => {
  const navigate = useNavigate();
  const { id: boardId } = useParams();
  const board = useAppSelector((state) => state.boards.currentBoard);
  const status = useAppSelector((state) => state.boards.currentBoardStatus);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [choosedId, setChoosedId] = useState('');

  useEffect(() => {
    if (boardId) {
      dispatch(boardActions.getById(boardId));
    }
  }, []);

  const handleReturn = (): void => {
    navigate(AppRoute.MAIN);
  };

  const handleToggleModal = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCloseConfirmation = (): void => {
    setChoosedId('');
  };

  const handleConfirm = (): void => {
    if (boardId && Boolean(choosedId)) {
      dispatch(columnActions.removeColumn({ boardId, columnId: choosedId }));
    }
  };

  if (status === DataStatus.REJECTED) {
    return <NotFound />;
  }

  if (!boardId || !board) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <div>
        <ConfirmationModal
          isOpen={Boolean(choosedId)}
          onClose={handleCloseConfirmation}
          onConfirm={handleConfirm}
        />
        <h1>You are on page {boardId}</h1>

        <>
          <Modal isOpen={isModalOpen} onClose={handleToggleModal}>
            <CreateColumnForm id={boardId} onClose={handleToggleModal} />
          </Modal>
          <Button title={'Add column'} onClick={handleToggleModal} />
          <div className={styles['column-wrapper']}>
            {board.columns &&
              [...board.columns].map((column) => (
                <Column key={column.id} item={column} boardId={boardId} />
              ))}
          </div>
          <Button title={'Back to Main Page'} onClick={handleReturn} />
        </>
      </div>
    </>
  );
};
