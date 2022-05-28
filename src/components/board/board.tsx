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
import { FormattedMessage } from '../common/common';
import { Column } from './components/column/column';
import { NotFound } from '../not-found-page/not-found-page';
import { Loader } from '../common/loader/loader';
import styles from './styles.module.scss';
import plusImg from '~/assets/images/plus.svg';
import editImg from '~/assets/images/edit.svg';

export const Board: FC = () => {
  const navigate = useNavigate();
  const { id: boardId } = useParams();
  const { board, status } = useAppSelector(({ boards }) => ({
    board: boards.currentBoard,
    status: boards.currentBoardStatus,
  }));
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

  const handleEdit = (): void => {
    console.log('mock');
  };

  if (status === DataStatus.REJECTED) {
    return <NotFound />;
  }

  if (!boardId || !board) {
    return <Loader />;
  }

  return (
    <main className={styles.main}>
      <ConfirmationModal
        isOpen={Boolean(choosedId)}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirm}
      />
      <section className={styles.section}>
        <div className={styles['board-title-container']}>
          <h1 className={styles['board-title']}>{board.title}</h1>
          <img className={styles['edit-board-title']} src={editImg} alt="edit board title" onClick={handleEdit} />
        </div>
        <div className={styles['column-wrapper']}>
          {board.columns &&
            [...board.columns].map((column) => (
              <Column key={column.id} item={column} boardId={boardId} />
            ))}
          <div className={styles['add-column-column']} onClick={handleToggleModal}>
            <img className={styles['add-column-img']} src={plusImg} alt="plus" />
            <FormattedMessage as="h3" message="board.buttons.addColumn" />
          </div>
        </div>
        <Button title={'board.buttons.backToMainPage'} onClick={handleReturn} />
        <Modal isOpen={isModalOpen} onClose={handleToggleModal}>
          <CreateColumnForm id={boardId} onClose={handleToggleModal} />
        </Modal>
      </section>
    </main>
  );
};
