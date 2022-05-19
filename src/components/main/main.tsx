import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '~/hooks/hooks';
import { board as boardActions } from '~/store/actions';
import styles from './styles.module.scss';

export const Main: FC = () => {
  const boards = useAppSelector((state) => state.boards.boards);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(boardActions.getAll());
  }, []);

  return (
    <ul className={styles.wrapper}>
      {boards.map(({ id, title }) => {
        const handleDelete = (): void => {
          dispatch(boardActions.remove(id));
        };
        const handleClick = (): void => {
          navigate(`/board/${id}`);
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
