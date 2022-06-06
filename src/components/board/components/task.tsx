import { joiResolver } from '@hookform/resolvers/joi';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputName } from '~/common/enums/enums';
import { TaskDto, UpdateTaskDto } from '~/common/types/types';
import { FormattedMessage, TextInput } from '~/components/common/common';
import { useAppDispatch } from '~/hooks/hooks';
import { task as taskActions } from '~/store/actions';
import { TaskUpdatePayload } from '~/store/task/common';
import { createTask } from '~/validation-schemas/validation-schemas';
import styles from './styles.module.scss';

type Props = {
  item: TaskDto;
  columnId: string;
  boardId: string;
  updateColumns: () => void;
  handleModalClose: () => void;
};

export const Task: FC<Props> = ({
  item,
  columnId,
  boardId,
  updateColumns,
  handleModalClose,
}) => {
  const dispatch = useAppDispatch();
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const [isDescriptionEdit, setIsDescriptionEdit] = useState(false);
  const { register, handleSubmit, getValues } = useForm<TaskDto>({
    resolver: joiResolver(createTask),
    defaultValues: {
      title: item.title,
      description: item.description,
    },
    mode: 'onChange',
  });

  const handleTitleEdit = (): void => {
    setIsTitleEdit(true);
    setIsDescriptionEdit(false);
  };
  const handleDescriptionEdit = (): void => {
    setIsDescriptionEdit(true);
    setIsTitleEdit(false);
  };

  const onSubmit = async ({ title, description }: TaskDto): Promise<void> => {
    const updateTaskResponseDto: UpdateTaskDto = {
      title,
      description,
      order: item.order,
      userId: item.userId,
      boardId,
      columnId,
    };
    const taskResponse: TaskUpdatePayload = {
      updateTaskResponseDto,
      taskId: item.id,
      boardId,
      columnId,
    };

    await dispatch(taskActions.updateTask(taskResponse));

    updateColumns();
    setIsTitleEdit(false);
    setIsDescriptionEdit(false);
    handleModalClose();
  };

  const { title, description } = getValues();

  return (
    <form className={styles['wrapper']} onSubmit={handleSubmit(onSubmit)}>
      {isTitleEdit ? (
        <TextInput
          className={styles['title']}
          title="board.taskCreatingForm.inputs.title"
          formRegisterValues={register(InputName.TITLE)}
        />
      ) : (
        <>
          <FormattedMessage
            className={styles['title']}
            as="span"
            message={'board.taskCreatingForm.inputs.title'}
          />
          <p className={styles['title-readable']} onClick={handleTitleEdit}>
            {title}
          </p>
        </>
      )}
      {isDescriptionEdit ? (
        <>
          <FormattedMessage
            className={styles['description-title']}
            as="span"
            message={'board.taskCreatingForm.inputs.description'}
          />
          <textarea
            className={styles['description-writable']}
            title="board.taskCreatingForm.inputs.description"
            {...register(InputName.DESCRIPTION)}
          />
        </>
      ) : (
        <>
          <FormattedMessage
            className={styles['description-title']}
            as="span"
            message={'board.taskCreatingForm.inputs.description'}
          />
          <p
            className={styles['description-readable']}
            onClick={handleDescriptionEdit}
          >
            {description}
          </p>
        </>
      )}
      <FormattedMessage
        className={styles['button']}
        as="button"
        message="board.taskCreatingForm.buttons.editTask"
      />
    </form>
  );
};
