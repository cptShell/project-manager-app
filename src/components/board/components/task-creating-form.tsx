import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { task as taskActions } from '~/store/actions';
import { InputName } from '~/common/enums/enums';
import { TextInput } from '~/components/common/common';
import { CreateTaskDto } from '~/common/types/types';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';

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
    <form onSubmit={handleSubmit(handleCreateForm)}>
      <h2>Task creation</h2>
      <TextInput formRegisterValues={register(InputName.TITLE)} />
      <TextInput formRegisterValues={register(InputName.DESCRIPTION)} />
      <button>Create task</button>
    </form>
  );
};
