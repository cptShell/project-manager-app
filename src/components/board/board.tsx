import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CreateBoardDto } from '~/common/types/types';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { board as boardActions } from '~/store/actions';
import { BoardButton } from './components/board-button';
import { BoardItem } from './components/board-item';
import styles from './styles.module.scss';

export const Board: FC = () => {
  const { handleSubmit, reset, register } = useForm<CreateBoardDto>();
  const [isInputVisible, setInputVisible] = useState(false);
  const boards = useAppSelector((state) => state.boards.boards);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(boardActions.getAll());
  }, []);

  const onSubmit = handleSubmit((data) => {
    dispatch(boardActions.create(data));
    reset();
    setInputVisible(false);
  });

  const handleReturn = (): void => {
    navigate('/main');
  };

  const onCancel = (): void => {
    setInputVisible(false);
    reset();
  };

  return (
    <div className={styles.wrapper}>
      {boards.map(({ id, title }) => (
        <BoardItem key={id} title={title} id={id} />
      ))}
      {!isInputVisible ? (
        <div>
          <BoardButton
            title={'Add board'}
            onClick={(): void => setInputVisible(true)}
          />
        </div>
      ) : (
        <>
          <div>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                placeholder="Enter board name"
                required
                {...register('title')}
              />
              <BoardButton title={'Add board'} />
            </form>
            <BoardButton title={'Cancel'} onClick={onCancel} />
          </div>
        </>
      )}
      <BoardButton title={'Back to Main Page'} onClick={handleReturn} />
    </div>
  );
};
