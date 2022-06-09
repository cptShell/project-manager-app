import { joiResolver } from '@hookform/resolvers/joi';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputName } from '~/common/enums/enums';
import { TaskDto, UpdateTaskDto, UserDto } from '~/common/types/types';
import { FormattedMessage, TextInput } from '~/components/common/common';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { task as taskActions } from '~/store/actions';
import { TaskUpdatePayload } from '~/store/task/common';
import { editTask } from '~/validation-schemas/validation-schemas';
import styles from './styles.module.scss';

type Props = {
  item: TaskDto;
  columnId: string;
  boardId: string;
  updateColumns: () => void;
  handleModalClose: () => void;
  taskOwner: UserDto | undefined;
};

type FormData = {
  userId: string;
  title: string;
  description: string;
};

export const Task: FC<Props> = ({
  item,
  columnId,
  boardId,
  updateColumns,
  handleModalClose,
  taskOwner,
}) => {
  const dispatch = useAppDispatch();
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const [isDescriptionEdit, setIsDescriptionEdit] = useState(false);
  const [isOwnerEdit, setIsOwnerEdit] = useState(false);
  const registeredUsers = useAppSelector(({ users }) => users.registeredUsers);
  const { register, handleSubmit, getValues } = useForm<FormData>({
    resolver: joiResolver(editTask),
    defaultValues: {
      userId: taskOwner?.id,
      title: item.title,
      description: item.description,
    },
    mode: 'onChange',
  });

  const closeAllEditables = (): void => {
    setIsTitleEdit(false);
    setIsDescriptionEdit(false);
    setIsOwnerEdit(false);
  };

  const handleTitleEdit = (): void => {
    closeAllEditables();
    setIsTitleEdit(true);
  };
  const handleDescriptionEdit = (): void => {
    closeAllEditables();
    setIsDescriptionEdit(true);
  };
  const handleOwnerEdit = (): void => {
    closeAllEditables();
    setIsOwnerEdit(true);
  };

  const onSubmit = async ({
    title,
    description,
    userId,
  }: FormData): Promise<void> => {
    const updateTaskResponseDto: UpdateTaskDto = {
      title,
      description,
      order: item.order,
      userId,
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

    console.log(title, description, userId);

    updateColumns();
    handleModalClose();
  };

  const { title, description } = getValues();

  return (
    <form className={styles['wrapper']} onSubmit={handleSubmit(onSubmit)}>
      <FormattedMessage
        className={styles['description-title']}
        as="span"
        message={'board.taskCreatingForm.inputs.owner'}
      />
      {isOwnerEdit ? (
        <select {...register(InputName.OWNER)}>
          {registeredUsers.map(({ id, name }) => {
            return (
              <option key={id} value={id}>
                {name}
              </option>
            );
          })}
        </select>
      ) : (
        <p onClick={handleOwnerEdit}>{taskOwner?.name || 'add owner'}</p>
      )}
      {isTitleEdit ? (
        <TextInput
          className={styles['title']}
          title="board.taskCreatingForm.inputs.title"
          formRegisterValues={register(InputName.TITLE)}
        />
      ) : (
        <>
          <FormattedMessage
            className={styles['description-title']}
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
