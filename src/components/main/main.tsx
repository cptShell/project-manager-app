import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '~/common/enums/enums';
import { useAppSelector, useAppDispatch } from '~/hooks/hooks';
import { board as boardActions } from '~/store/actions';
import { ConfirmationModal } from '../common/confirmation-modal/confirmation-modal';
import styles from './styles.module.scss';

export const Main: FC = () => {
  const boards = useAppSelector((state) => state.boards.boards);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [choosedId, setChoosedId] = useState('');

  useEffect(() => {
    dispatch(boardActions.getAll());
  }, []);

  const handleCloseConfirmation = (): void => {
    setChoosedId('');
  };

  const handleConfirm = (): void => {
    dispatch(boardActions.remove(choosedId));
  };

  return (
    <ul className={styles.wrapper}>
      <ConfirmationModal
        isOpen={Boolean(choosedId)}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirm}
      />
      {boards.map(({ id, title }) => {
        const handleDelete = (): void => {
          setChoosedId(id);
        };
        const handleClick = (): void => {
          navigate(`${AppRoute.BOARD}/${id}`);
        };
        return (
          <li key={id}>
            <button
              onClick={handleClick}
              className={styles['board-wrapper']}
              key={id}
            >
              {title}
            </button>
            <button onClick={handleDelete}>x</button>
          </li>
        );
      })}
    </ul>
  );
};
