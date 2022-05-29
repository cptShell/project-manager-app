import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { task as taskActions } from '~/store/actions';
import { InputName } from '~/common/enums/enums';
import { FormattedMessage, TextInput } from '~/components/common/common';
import { CreateTaskDto } from '~/common/types/types';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';

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
  const { register, handleSubmit, reset } = useForm<CreateTaskDto>();
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
    <form onSubmit={handleSubmit(handleCreateForm)}>
      <FormattedMessage as="h2" message="board.taskCreatingForm.title" />
      <TextInput
        title="board.taskCreatingForm.inputs.title"
        formRegisterValues={register(InputName.TITLE)}
      />
      <TextInput
        title="board.taskCreatingForm.inputs.description"
        formRegisterValues={register(InputName.DESCRIPTION)}
      />
      <button>
        <FormattedMessage
          as="span"
          message="board.taskCreatingForm.buttons.createTask"
        />
      </button>
    </form>
  );
};
