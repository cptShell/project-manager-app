import { FC } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { task as taskActions } from '~/store/actions';
import { InputName } from '~/common/enums/enums';
import { TextInput } from '~/components/common/common';
import { CreateTaskDto } from '~/common/types/types';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { createTask } from '~/validation-schemas/validation-schemas';
import styles from './styles.module.scss';
import { Button } from '~/components/common/button/button';
import { Textarea } from '~/components/common/input/textarea/textarea';

type Props = {
  boardId: string;
  columnId: string;
  onClose: () => void;
  updateColumns: () => void;
};

export const TaskCreatingForm: FC<Props> = ({
  boardId,
  columnId,
  onClose,
  updateColumns,
}) => {
  const { register, handleSubmit, reset, formState } = useForm<CreateTaskDto>({
    resolver: joiResolver(createTask),
  });
  const { title: titleError, description: descriptionError } = formState.errors;
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user?.id);

  const handleCreateForm = async ({
    title,
    description,
  }: CreateTaskDto): Promise<void> => {
    if (userId) {
      await dispatch(
        taskActions.createTask({
          boardId,
          columnId,
          createTaskDto: { title, description, userId },
        }),
      );

      updateColumns();
      reset();
      onClose();
    }
  };

  return (
    <form
      className={styles['wrapper']}
      onSubmit={handleSubmit(handleCreateForm)}
    >
      <TextInput
        className={styles['title']}
        title="board.taskCreatingForm.inputs.title"
        formRegisterValues={register(InputName.TITLE)}
        errorMessage={titleError?.message}
      />
      <Textarea
        className={styles['title']}
        title="board.taskCreatingForm.inputs.description"
        formRegisterValues={register(InputName.DESCRIPTION)}
        errorMessage={descriptionError?.message}
      />
      <Button
        title={'board.taskCreatingForm.buttons.createTask'}
      />
    </form>
  );
};
