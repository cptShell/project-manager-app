import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreateBoardDto } from '~/common/types/types';
import { useAppDispatch } from '~/hooks/hooks';
import { board as boardActions } from '~/store/actions';
import { Button } from './button';
import styles from '../styles.module.scss';

type Props = {
  title: string;
  id: string;
};

export const BoardItem: FC<Props> = ({ title, id }) => {
  const [writableMode, setWritableMode] = useState(false);
  const dispatch = useAppDispatch();
  const { handleSubmit, register, reset } = useForm<CreateBoardDto>();

  const handleWritableMode = (): void => {
    setWritableMode(true);
    reset();
  };

  const handleTitleUpdate = handleSubmit(async (data) => {
    const { title } = data;
    await dispatch(boardActions.update({ id, title }));
    setWritableMode(false);
  });

  return (
    <div className={styles['item-wrapper']}>
      {writableMode ? (
        <>
          <form onSubmit={handleTitleUpdate}>
            <input type="text" {...register('title')} />
            <Button title={'Submit'} />
          </form>
          <Button title={'Cancel'} onClick={handleWritableMode} />
        </>
      ) : (
        <h2 onClick={handleWritableMode}>{title}</h2>
      )}
      <Button title={'Add task'} />
    </div>
  );
};
