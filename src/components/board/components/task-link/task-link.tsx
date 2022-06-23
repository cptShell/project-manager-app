import { FC, useState, MouseEvent } from 'react';
import { useAppDispatch } from '~/hooks/hooks';
import { task as taskActions } from '~/store/actions';
import { Draggable } from 'react-beautiful-dnd';
import { TaskDto, UserDto } from '~/common/types/types';
import { ConfirmationModal } from '~/components/common/confirmation-modal/confirmation-modal';
import { Task } from '../task';
import styles from './styles.module.scss';
import bucketImg from '~/assets/images/delete-bucket.svg';
import { Modal } from '~/components/common/modal/modal';

type Props = {
  data: TaskDto;
  boardId: string;
  columnId: string;
  updateColumns: () => void;
  taskOwner: UserDto | undefined;
  taskIndex: number;
  isDragging: boolean;
};

export const TaskLink: FC<Props> = ({
  data,
  boardId,
  columnId,
  taskOwner,
  updateColumns,
  taskIndex,
  isDragging,
}) => {
  const { id, title, description } = data;
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleOpenConfirmation = (e: MouseEvent): void => {
    setConfirmationModalOpen(true);
    e.stopPropagation();
  };
  const handleCloseConfirmation = (): void => {
    setConfirmationModalOpen(false);
  };
  const handleModalOpen = (): void => {
    setIsOpen(true);
  };
  const handleModalClose = (): void => {
    setIsOpen(false);
  };

  const handleDeleteTask = async (): Promise<void> => {
    await dispatch(taskActions.removeTask({ boardId, columnId, taskId: id }));

    updateColumns();
  };

  return (
    <Draggable
      draggableId={data.id}
      index={taskIndex}
      isDragDisabled={isDragging}
    >
      {(provided, snapshot): JSX.Element => {
        return (
          <div
            ref={provided.innerRef}
            data-snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <ConfirmationModal
              message={'modals.confirmation.deleteTask'}
              isOpen={confirmationModalOpen}
              onClose={handleCloseConfirmation}
              onConfirm={handleDeleteTask}
            />
            {taskOwner && (
              <Modal isOpen={isOpen} onClose={handleModalClose}>
                <Task
                  item={data}
                  boardId={boardId}
                  columnId={columnId}
                  updateColumns={updateColumns}
                  handleModalClose={handleModalClose}
                  taskOwner={taskOwner}
                />
              </Modal>
            )}
            <li
              className={styles['column-item']}
              key={id}
              onClick={handleModalOpen}
            >
              <div className={styles['column-top']}>
                <h3 className={styles['column-title']}>{title}</h3>
                <img
                  className={styles['column-img']}
                  src={bucketImg}
                  onClick={handleOpenConfirmation}
                  alt="delete"
                ></img>
              </div>
              <div className={styles['column-bottom']}>
                <p className={styles['column-text']}>{description}</p>
              </div>
              {taskOwner && (
                <span className={styles.owner}>{taskOwner.name}</span>
              )}
            </li>
          </div>
        );
      }}
    </Draggable>
  );
};
