import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Droppable } from 'react-beautiful-dnd';
import { joiResolver } from '@hookform/resolvers/joi';
import {
  BoardFilter,
  ColumnDto,
  CreateColumnDto,
  FullColumnDto,
  UserDto,
} from '~/common/types/types';
import { column as columnActions } from '~/store/actions';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { Modal } from '~/components/common/modal/modal';
import { TaskCreatingForm } from '../task-creating-form';
import { ConfirmationModal } from '~/components/common/confirmation-modal/confirmation-modal';
import { TaskLink } from '../task-link/task-link';
import { createColumn } from '~/validation-schemas/validation-schemas';
import bucketImg from '~/assets/images/delete-bucket.svg';
import addImg from '~/assets/images/add.svg';
import cancelImg from '~/assets/images/cancel.svg';
import acceptImg from '~/assets/images/accept.svg';
import styles from './styles.module.scss';

type FormData = {
  title: string;
};

type Props = {
  item: FullColumnDto;
  boardId: string;
  handleDeleteColumn: () => void;
  usersMap: Map<string, UserDto>;
  filter: BoardFilter;
  updateColumns: () => void;
};

export const Column: FC<Props> = ({
  item,
  boardId,
  handleDeleteColumn,
  usersMap,
  filter,
  updateColumns,
}) => {
  const { id: columnId, tasks } = item;
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector(({ auth }) => ({
    currentUser: auth.user,
  }));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(item.title);
  const { register, handleSubmit, reset } = useForm<CreateColumnDto>({
    resolver: joiResolver(createColumn),
    mode: 'onChange',
  });

  const handleToggleModal = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOpenConfirmation = (e: React.MouseEvent): void => {
    setConfirmationModalOpen(true);
    e.stopPropagation();
  };
  const handleCloseConfirmation = (): void => {
    setConfirmationModalOpen(false);
  };

  const handleEditOpen = (): void => {
    setIsEdit(true);
  };
  const handleDeclineEdit = (): void => {
    reset();
    setIsEdit(false);
  };
  const handleAcceptEdit = (data: FormData): void => {
    const newTitle = data.title || title;

    const createColumnResponseDto: ColumnDto = {
      id: item.id,
      title: newTitle,
      order: item.order,
    };
    const columnResponse = {
      boardId,
      createColumnResponseDto,
    };

    dispatch(columnActions.update(columnResponse));

    setIsEdit(false);
    setTitle(newTitle);
    reset();
  };
  const submit = (): void => {
    handleSubmit(handleAcceptEdit)();
  };
  const handleAddTask = (e: React.MouseEvent): void => {
    handleToggleModal();
    e.stopPropagation();
  };

  return (
    <div className={styles['column-item']}>
      {isEdit ? (
        <div className={styles['column-header']}>
          <div className={styles['title-wrapper']}>
            <div className={styles['title-before-edit']}>
              <img
                className={styles['cancel']}
                src={cancelImg}
                alt="cancel"
                onClick={handleDeclineEdit}
              />
              <img
                className={styles['accept']}
                src={acceptImg}
                alt="accept"
                onClick={submit}
              />
            </div>
            <form onSubmit={handleSubmit(handleAcceptEdit)}>
              <input
                {...register('title')}
                defaultValue={title}
                className={styles['input-edit']}
                type="text"
                placeholder={title}
              />
            </form>
          </div>
        </div>
      ) : (
        <div className={styles['column-header']} onClick={handleEditOpen}>
          <div className={styles['title-wrapper']}>
            <div className={styles['title-before']} />
            <h3 title={title} className={styles.title}>
              {title}
            </h3>
            <div className={styles['title-after']}>{item.tasks.length}</div>
            <div className={styles['control-wrapper']}>
              <img
                className={styles['add-task']}
                src={addImg}
                alt="add task"
                onClick={handleAddTask}
              />
              <img
                className={styles['delete-column']}
                src={bucketImg}
                alt="delete column"
                onClick={handleOpenConfirmation}
              />
            </div>
          </div>
        </div>
      )}
      <Droppable droppableId={`${item.id}`}>
        {(provided): JSX.Element => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={styles['task-list-wrapper']}
          >
            <ul style={{ minHeight: '150px' }} className={styles['task-list']}>
              {tasks.map((task, index) => {
                const taskOwner = usersMap.get(task.userId);

                if (filter.onlyMyTasks && task.userId !== currentUser?.id) {
                  return;
                }

                return (
                  <TaskLink
                    key={task.id}
                    taskIndex={index}
                    data={task}
                    columnId={columnId}
                    boardId={boardId}
                    taskOwner={taskOwner}
                    updateColumns={updateColumns}
                  />
                );
              })}
              {provided.placeholder}
            </ul>
          </div>
        )}
      </Droppable>
      <Modal isOpen={isModalOpen} onClose={handleToggleModal}>
        <TaskCreatingForm
          boardId={boardId}
          columnId={columnId}
          onClose={handleToggleModal}
          updateColumns={updateColumns}
        />
      </Modal>
      <ConfirmationModal
        message={'modals.confirmation.deleteColumn'}
        isOpen={confirmationModalOpen}
        onClose={handleCloseConfirmation}
        onConfirm={handleDeleteColumn}
      />
    </div>
  );
};
