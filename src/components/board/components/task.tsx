import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TaskDto } from '~/common/types/types';
import { useAppDispatch } from '~/hooks/hooks';
import { task as taskActions } from '~/store/actions';
import { TaskResponse } from '~/store/task/common';

type Props = {
  item: TaskDto;
  columnId: string;
  boardId: string;
};

export const Task: FC<Props> = ({ item, columnId, boardId }) => {
  const { title: initialTitle, description: initialDescription } = item;
  const dispatch = useAppDispatch();
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const [isDescriptionEdit, setIsDescriptionEdit] = useState(false);
  const { register, handleSubmit, getValues } = useForm<TaskDto>({
    defaultValues: {
      title: initialTitle,
      description: initialDescription,
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

  const onSubmit = ({ title, description }: TaskDto): void => {
    const updatedItem = { ...item, title, description };
    const taskResponse: TaskResponse = {
      createTaskResponseDto: updatedItem,
      boardId,
      columnId,
    };
    setIsTitleEdit(false);
    setIsDescriptionEdit(false);
    dispatch(taskActions.updateTask(taskResponse));
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
