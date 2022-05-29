import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TaskDto, UpdateTaskDto } from '~/common/types/types';
import { useAppDispatch } from '~/hooks/hooks';
import { task as taskActions } from '~/store/actions';
import { TaskUpdatePayload } from '~/store/task/common';

type Props = {
  item: TaskDto;
  columnId: string;
  boardId: string;
  updateColumns: () => void;
};

export const Task: FC<Props> = ({ item, columnId, boardId, updateColumns }) => {
  const dispatch = useAppDispatch();
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const [isDescriptionEdit, setIsDescriptionEdit] = useState(false);
  const { register, handleSubmit, getValues } = useForm<TaskDto>({
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
  };

  const { title, description } = getValues();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Task Card</h2>
      {isTitleEdit ? (
        <input type="text" {...register('title')} />
      ) : (
        <h3 onClick={handleTitleEdit}>{title}</h3>
      )}
      {isDescriptionEdit ? (
        <input type="text" {...register('description')} />
      ) : (
        <p onClick={handleDescriptionEdit}>{description}</p>
      )}
    </form>
  );
};
