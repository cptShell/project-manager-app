import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TaskResponseDto } from '../common/type/type';

type Props = {
  item: TaskResponseDto;
};

export const Task: FC<Props> = ({ item }) => {
  const { title: initialTitle, description: initialDescription } = item;
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const [isDescriptionEdit, setIsDescriptionEdit] = useState(false);
  const { register, handleSubmit, getValues } = useForm<TaskResponseDto>({
    defaultValues: {
      title: initialTitle,
      description: initialDescription,
    },
    mode: 'onChange',
  });

  const handleTitleEdit = (): void => setIsTitleEdit(true);
  const handleDescriptionEdit = (): void => setIsDescriptionEdit(true);

  const onSubmit = ({ title, description }: TaskResponseDto): void => {
    //TODO: add dispatch here
    console.log({ title, description });
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
