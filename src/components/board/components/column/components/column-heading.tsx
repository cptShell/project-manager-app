import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { column as columnActions } from '~/store/actions';
import {
  ColumnDto,
  ColumnResponse,
  CreateColumnDto,
  FullColumnDto,
} from '~/common/types/types';
import { createColumn } from '~/validation-schemas/validation-schemas';
import bucketImg from '~/assets/images/delete-bucket.svg';
import addImg from '~/assets/images/add.svg';
import cancelImg from '~/assets/images/cancel.svg';
import acceptImg from '~/assets/images/accept.svg';
import styles from '../styles.module.scss';
import { useAppDispatch } from '~/hooks/hooks';

type Props = {
  item: FullColumnDto;
  boardId: string;
  handleAddTask: (e: React.MouseEvent) => void;
  handleOpenConfirmation: (e: React.MouseEvent) => void;
};

type FormData = {
  title: string;
};

export const ColumnHeading: FC<Props> = ({
  boardId,
  item,
  handleAddTask,
  handleOpenConfirmation,
}) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset } = useForm<CreateColumnDto>({
    resolver: joiResolver(createColumn),
    mode: 'onChange',
  });
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(item.title);

  const handleEditOpen = (): void => {
    if (!isEdit) {
      setIsEdit(true);
    }
  };
  const handleDeclineEdit = (): void => {
    reset();
    setIsEdit(false);
  };

  const handleAcceptEdit = (data: FormData): void => {
    const newTitle = data.title || title;

    const createColumnResponseDto: ColumnDto = {
      id: item.id,
      title: newTitle,
      order: item.order,
    };
    const columnResponse: ColumnResponse = {
      boardId,
      createColumnResponseDto,
    };

    dispatch(columnActions.update(columnResponse));

    setIsEdit(false);
    setTitle(newTitle);
    reset();
  };

  const submit = (): void => {
    handleSubmit(handleAcceptEdit)();
  };

  return (
    <div className={styles['column-header']} onClick={handleEditOpen}>
      {isEdit ? (
        <div className={styles['title-wrapper']}>
          <div className={styles['title-before-edit']}>
            <img
              className={styles['cancel']}
              src={cancelImg}
              alt="cancel"
              onClick={handleDeclineEdit}
            />
            <img
              className={styles['accept']}
              src={acceptImg}
              alt="accept"
              onClick={submit}
            />
          </div>
          <form onSubmit={handleSubmit(handleAcceptEdit)}>
            <input
              {...register('title')}
              defaultValue={title}
              className={styles['input-edit']}
              type="text"
              placeholder={title}
            />
          </form>
        </div>
      ) : (
        <div className={styles['title-wrapper']}>
          <div className={styles['title-before']} />
          <h3 title={title} className={styles.title}>
            {title}
          </h3>
          <div className={styles['title-after']}>{item.tasks.length}</div>
          <div className={styles['control-wrapper']}>
            <img
              className={styles['add-task']}
              src={addImg}
              alt="add task"
              onClick={handleAddTask}
            />
            <img
              className={styles['delete-column']}
              src={bucketImg}
              alt="delete column"
              onClick={handleOpenConfirmation}
            />
          </div>
        </div>
      )}
    </div>
  );
};
