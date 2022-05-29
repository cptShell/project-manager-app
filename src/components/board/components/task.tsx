import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TaskDto, UpdateTaskDto } from '~/common/types/types';
import { useAppDispatch } from '~/hooks/hooks';
import { task as taskActions } from '~/store/actions';
import { TaskUpdatePayload } from '~/store/task/common';

type TaskInfo = {
  title: string;
  description: string;
};

type Props = {
  item: TaskDto;
  taskInfo: TaskInfo;
  setTaskInfo: (taskInfo: TaskInfo) => void;
  columnId: string;
  boardId: string;
};

export const Task: FC<Props> = ({
  item,
  columnId,
  boardId,
  taskInfo,
  setTaskInfo,
}) => {
  const dispatch = useAppDispatch();
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const [isDescriptionEdit, setIsDescriptionEdit] = useState(false);
  const { register, handleSubmit, getValues } = useForm<TaskDto>({
    defaultValues: {
      title: taskInfo.title,
      description: taskInfo.description,
    },
    mode: 'onChange',
  });

  const handleTitleEdit = (): void => setIsTitleEdit(true);
  const handleDescriptionEdit = (): void => setIsDescriptionEdit(true);

  const onSubmit = ({ title, description }: TaskDto): void => {
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
    setIsTitleEdit(false);
    setIsDescriptionEdit(false);
    setTaskInfo({ title, description });
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
