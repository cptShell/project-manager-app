import { joiResolver } from '@hookform/resolvers/joi';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { InputName } from '~/common/enums/enums';
import { TaskDto, UpdateTaskDto, UserDto } from '~/common/types/types';
import { Button } from '~/components/common/button/button';
import { FormattedMessage, TextInput } from '~/components/common/common';
import { Textarea } from '~/components/common/input/textarea/textarea';
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
  const registeredUsers = useAppSelector(({ users }) => users.registeredUsers);
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: joiResolver(editTask),
    defaultValues: {
      userId: taskOwner?.id,
      title: item.title,
      description: item.description,
    },
    mode: 'onChange',
  });

  const { title: titleError, description: descriptionError } = formState.errors;

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

    updateColumns();
    handleModalClose();
  };

  return (
    <form className={styles['wrapper']} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.label}>
        <FormattedMessage
          className={styles['description-title']}
          as="span"
          message={'board.taskCreatingForm.inputs.owner'}
        />
        <select
          className={styles['owner-select']}
          {...register(InputName.OWNER)}>
          {registeredUsers.map(({ id, name }) => {
            return (
              <option key={id} value={id}>
                {name}
              </option>
            );
          })}
        </select>
      </div>
      <TextInput
        className={styles['title']}
        title="board.taskCreatingForm.inputs.title"
        formRegisterValues={register(InputName.TITLE)}
        errorMessage={titleError?.message}
      />
      <Textarea
        className={styles.label}
        title="board.taskCreatingForm.inputs.description"
        formRegisterValues={register(InputName.DESCRIPTION)}
        errorMessage={descriptionError?.message}
      />
      <Button
        title={'board.taskCreatingForm.buttons.editTask'}
      />
    </form>
  );
};
