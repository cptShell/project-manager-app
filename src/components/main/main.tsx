import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '~/common/enums/enums';
import { useAppSelector, useAppDispatch } from '~/hooks/hooks';
import { board as boardActions } from '~/store/actions';
import { ConfirmationModal } from '../common/confirmation-modal/confirmation-modal';
import styles from './styles.module.scss';
import bucketImg from '~/assets/images/delete-bucket.svg';
import plusImg from '~/assets/images/plus.svg';

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
          const handleClick = (): void => {
            navigate(`${AppRoute.BOARD}/${id}`);
          };
          return (
            <li className={styles.li}
              onClick={handleClick}
              key={id}>
              <div className={styles['board-top']}>
                <h3 className={styles['board-h3']}>
                  {title}
                </h3>
                <img className={styles['board-img']}
                  src={bucketImg}
                  onClick={handleDelete}
                  alt="delete">
                </img>
              </div>
              <div className={styles['board-bottom']}>
                <p className={styles['board-p']}>
                  {description}
                </p>
              </div>
            </li>
          );
        })}
        <li className={styles['add-board-board']}>
          <img className={styles['plus-img']} src={plusImg} alt="add board" />
        </li>
      </ul>
    </section>
  );
};
