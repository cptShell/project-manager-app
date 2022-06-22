import { FC, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { BoardFilter, FullColumnDto, UserDto } from '~/common/types/types';
import { useAppSelector } from '~/hooks/hooks';
import { Modal } from '~/components/common/modal/modal';
import { TaskCreatingForm } from '../task-creating-form';
import { ConfirmationModal } from '~/components/common/confirmation-modal/confirmation-modal';
import { TaskLink } from '../task-link/task-link';
import { ColumnHeading } from './components/column-heading';
import styles from './styles.module.scss';

type Props = {
  item: FullColumnDto;
  boardId: string;
  handleDeleteColumn: () => void;
  usersMap: Map<string, UserDto>;
  filter: BoardFilter;
  updateColumns: () => void;
  columnIndex: number;
  isDragging: boolean;
};

export const Column: FC<Props> = ({
  item,
  boardId,
  handleDeleteColumn,
  usersMap,
  filter,
  updateColumns,
  columnIndex,
  isDragging,
}) => {
  const { id: columnId, tasks } = item;
  const { currentUser } = useAppSelector(({ auth }) => ({
    currentUser: auth.user,
  }));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

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

  const handleAddTask = (e: React.MouseEvent): void => {
    handleToggleModal();
    e.stopPropagation();
  };

  return (
    <Draggable
      draggableId={`${item.id}`}
      index={columnIndex}
      isDragDisabled={isDragging}
    >
      {(provided, snapshot): JSX.Element => (
        <div
          ref={provided.innerRef}
          data-snapshot={snapshot}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={styles['column-item']}
        >
          <ColumnHeading
            boardId={boardId}
            item={item}
            handleAddTask={handleAddTask}
            handleOpenConfirmation={handleOpenConfirmation}
          />
          <Droppable type="task" droppableId={item.id}>
            {(provided): JSX.Element => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={styles['task-list-wrapper']}
              >
                <ul
                  style={{ minHeight: '150px' }}
                  className={styles['task-list']}
                >
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
                        isDragging={isDragging}
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
      )}
    </Draggable>
  );
};
