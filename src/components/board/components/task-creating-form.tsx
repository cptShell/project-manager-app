import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { task as taskActions } from '~/store/actions';
import { InputName } from '~/common/enums/enums';
import { FormattedMessage, TextInput } from '~/components/common/common';
import { CreateTaskDto } from '~/common/types/types';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import styles from './styles.module.scss';

type Props = {
  boardId: string;
  columnId: string;
  onClose: () => void;
};

export const TaskCreatingForm: FC<Props> = ({ boardId, columnId, onClose }) => {
  const { register, handleSubmit, reset } = useForm<CreateTaskDto>();
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user?.id);

  const handleCreateForm = ({ title, description }: CreateTaskDto): void => {
    if (userId) {
      dispatch(
        taskActions.createTask({
          boardId,
          columnId,
          createTaskDto: { title, description, userId },
        }),
      );
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
      />
      <div>
        <FormattedMessage
          className={styles['description-title']}
          as="span"
          message={'board.taskCreatingForm.inputs.description'}
        />
        <textarea
          className={styles['description']}
          {...register(InputName.DESCRIPTION)}
        />
      </div>

      <FormattedMessage
        className={styles['button']}
        as="button"
        message="board.taskCreatingForm.buttons.createTask"
      />
    </form>
  );
};
