import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { task as taskActions } from '~/store/actions';
import { InputName } from '~/common/enums/enums';
import { FormattedMessage, TextInput } from '~/components/common/common';
import { AppLocalizationKey, CreateTaskDto } from '~/common/types/types';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import styles from './styles.module.scss';
import { joiResolver } from '@hookform/resolvers/joi';
import { createTask } from '~/validation-schemas/validation-schemas';

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
      <div>
        <FormattedMessage
          className={styles['description-title']}
          as="span"
          message={'board.taskCreatingForm.inputs.description'}
        />
        <textarea
          className={styles['description-writable']}
          {...register(InputName.DESCRIPTION)}
        />
        {Boolean(descriptionError?.message) && (
          <FormattedMessage
            className={styles['error']}
            as="span"
            message={descriptionError?.message as AppLocalizationKey}
          />
        )}
      </div>

      <FormattedMessage
        className={styles['button']}
        as="button"
        message="board.taskCreatingForm.buttons.createTask"
      />
    </form>
  );
};
