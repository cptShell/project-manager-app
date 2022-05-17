import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CreateBoardDto } from '~/common/types/types';
import { useAppDispatch } from '~/hooks/hooks';
import { board as boardActions } from '~/store/actions';
import { BoardButton } from './components/board-button';
//import { BoardItem } from './components/board-item';
import styles from './styles.module.scss';

export const Board: FC = () => {
  const { handleSubmit, reset, register } = useForm<CreateBoardDto>();
  const [isInputVisible, setInputVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
      {/* {board.map((item, index) => (
        <BoardItem key={index} title={item} />
      ))} */}
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
