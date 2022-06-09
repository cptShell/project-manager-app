import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '~/common/enums/enums';
import { useAppSelector, useAppDispatch } from '~/hooks/hooks';
import { board as boardActions } from '~/store/actions';
import { ConfirmationModal } from '../common/confirmation-modal/confirmation-modal';
import { BoardCreatingForm } from './components/board-creating-form';
import styles from './styles.module.scss';
import bucketImg from '~/assets/images/delete-bucket.svg';
import plusImg from '~/assets/images/plus.svg';
import { FormattedMessage } from '../common/common';

export const Main: FC = () => {
  const boards = useAppSelector((state) => state.boards.boards);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [choosedId, setChoosedId] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(boardActions.getAll());
  }, []);

  const handleCloseConfirmation = (): void => {
    setChoosedId('');
  };

  const handleConfirm = (): void => {
    dispatch(boardActions.removeBoard(choosedId));
  };

  const handleCreateBoard = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <main className={styles.main}>
      <div className={styles['outer-wrapper']}>
        <FormattedMessage className={styles.title} as="h1" message={'main.title'} />
        <ul className={styles.wrapper}>
          <ConfirmationModal
            isOpen={Boolean(choosedId)}
            onClose={handleCloseConfirmation}
            onConfirm={handleConfirm}
            message={'modals.confirmation.deleteBoard'}
          />
          {boards.map(({ id, title, description }) => {
            const handleDelete = (e: React.MouseEvent): void => {
              setChoosedId(id);
              e.stopPropagation();
            };
            const handleClick = (): void => {
              navigate(`${AppRoute.BOARD}/${id}`);
            };
            return (
              <li className={styles['board-item']} onClick={handleClick} key={id}>
                <div className={styles['board-top']}>
                  <h3 className={styles['board-title']}>{title}</h3>
                  <img
                    className={styles['board-img']}
                    src={bucketImg}
                    onClick={handleDelete}
                    alt="delete"
                  />
                </div>
                <div className={styles['board-bottom']}>
                  <p className={styles['board-text']}>{description}</p>
                </div>
              </li>
            );
          })}
          <li className={styles['add-board-board']} onClick={handleCreateBoard}>
            <img className={styles['plus-img']} src={plusImg} alt="add board" />
          </li>
        </ul>
      </div>
      <BoardCreatingForm isOpen={isOpen} onClose={handleCreateBoard} />
    </main>
  );
};
