import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '~/common/enums/enums';
import { useAppSelector, useAppDispatch } from '~/hooks/hooks';
import { board as boardActions } from '~/store/actions';
import { Modal } from '../common/modal/modal';
import { ConfirmationModal } from '../common/confirmation-modal/confirmation-modal';
import { BoardCreatingForm } from './components/board-creating-form';
import styles from './styles.module.scss';
import bucketImg from '~/assets/images/delete-bucket.svg';
import plusImg from '~/assets/images/plus.svg';

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
    <section className={styles.section} >
      <ul className={styles.wrapper}>
        <ConfirmationModal
          isOpen={Boolean(choosedId)}
          onClose={handleCloseConfirmation}
          onConfirm={handleConfirm}
        />
        {boards.map(({ id, title, description }) => {
          const handleDelete = (): void => {
            setChoosedId(id);
          };
          const handleClick = (e: React.MouseEvent): void => {
            if (e.target === e.currentTarget) {
              navigate(`${AppRoute.BOARD}/${id}`);
            }
          };
          return (
            <li className={styles['board-item']}
              onClick={handleClick}
              key={id}>
              <div className={styles['board-top']}>
                <h3 className={styles['board-title']}>
                  {title}
                </h3>
                <img className={styles['board-img']}
                  src={bucketImg}
                  onClick={handleDelete}
                  alt="delete">
                </img>
              </div>
              <div className={styles['board-bottom']}>
                <p className={styles['board-text']}>
                  {description}
                </p>
              </div>
            </li>
          );
        })}
        <li className={styles['add-board-board']} onClick={handleCreateBoard}>
          <img className={styles['plus-img']} src={plusImg} alt="add board" />
        </li>
      </ul>
      <Modal isOpen={isOpen} onClose={handleCreateBoard}>
        <BoardCreatingForm isOpen={isOpen} setIsOpen={setIsOpen} />
      </Modal>
    </section>
  );
};
