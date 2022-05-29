import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputName } from '~/common/enums/enums';
import { TaskDto } from '~/common/types/types';
import { FormattedMessage, TextInput } from '~/components/common/common';
import { useAppDispatch } from '~/hooks/hooks';
import { task as taskActions } from '~/store/actions';
import { TaskResponse } from '~/store/task/common';
import styles from './styles.module.scss';

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

  const handleTitleEdit = (): void => setIsTitleEdit(true);
  const handleDescriptionEdit = (): void => setIsDescriptionEdit(true);

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
    <form className={styles['wrapper']} onSubmit={handleSubmit(onSubmit)}>
      {isTitleEdit ? (
        <TextInput
          className={styles['title']}
          title="board.taskCreatingForm.inputs.title"
          formRegisterValues={register(InputName.TITLE)}
        />
      ) : (
        <>
          <FormattedMessage
            className={styles['title']}
            as="span"
            message={'board.taskCreatingForm.inputs.title'}
          />
          <p onClick={handleTitleEdit}>{title}</p>
        </>
      )}
      {isDescriptionEdit ? (
        <TextInput
          className={styles['description']}
          title="board.taskCreatingForm.inputs.description"
          formRegisterValues={register(InputName.DESCRIPTION)}
        />
      ) : (
        <>
          <FormattedMessage
            className={styles['description']}
            as="span"
            message={'board.taskCreatingForm.inputs.description'}
          />
          <p onClick={handleDescriptionEdit}>{description}</p>
        </>
      )}
      <FormattedMessage
        className={styles['button']}
        as="button"
        message="board.taskCreatingForm.buttons.editTask"
      />
    </form>
  );
};
