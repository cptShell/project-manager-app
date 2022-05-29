import { FC, useRef, useState } from 'react';
import {
  DragColumnItem,
  FullColumnDto,
  TaskPosition,
} from '~/common/types/types';
import { column as columnActions, task as taskActions } from '~/store/actions';
import styles from './styles.module.scss';
import { useAppDispatch } from '~/hooks/hooks';
import { Modal } from '~/components/common/modal/modal';
import { TaskCreatingForm } from '../task-creating-form';
import { ConfirmationModal } from '~/components/common/confirmation-modal/confirmation-modal';
import { TaskLink } from '../task-link/task-link';
import bucketImg from '~/assets/images/delete-bucket.svg';
import addImg from '~/assets/images/add.svg';
import cancelImg from '~/assets/images/cancel.svg';
import acceptImg from '~/assets/images/accept.svg';
import { useDrag, useDrop } from 'react-dnd';
import { Identifier, XYCoord } from 'dnd-core';
import { ItemType } from '~/common/enums/enums';

type Props = {
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
  moveTask: (dragPosition: TaskPosition, hoverPosition: TaskPosition) => void;
  item: FullColumnDto;
  boardId: string;
  columnIndex: number;
  dropColumn: (dropIndex: number) => void;
  dropTask: (dropTask: TaskPosition) => void;
};

export const Column: FC<Props> = ({
  item,
  boardId,
  moveColumn,
  moveTask,
  columnIndex,
  dropColumn,
  dropTask,
}) => {
  const { id: columnId, title, tasks } = item;
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const columnRef = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<
    DragColumnItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemType.COLUMN,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragColumnItem, monitor) {
      if (!columnRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = columnIndex;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = columnRef.current?.getBoundingClientRect();
      const deadZoneX = (hoverBoundingRect.right - hoverBoundingRect.left) / 3;
      const clientOffset = monitor.getClientOffset();
      const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

      if (dragIndex < hoverIndex && hoverClientX < deadZoneX) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientX > deadZoneX) {
        return;
      }

      moveColumn(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
    drop() {
      if (!columnRef.current) {
        return;
      }

      dropColumn(columnIndex);
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType.COLUMN,
    item: () => {
      return { id: item.id, index: columnIndex };
    },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  const opacity = isDragging ? 0.5 : 1;

  const handleDeleteColumn = (): void => {
    dispatch(columnActions.removeColumn({ boardId, columnId }));
  };

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

  const handleEdit = (): void => {
    setIsEdit(!isEdit);
  };
  const handleCancelEdit = (): void => {
    setIsEdit(!isEdit);
  };
  const handleAcceptEdit = (): void => {
    setIsEdit(!isEdit);
  };
  const handleAddTask = (e: React.MouseEvent): void => {
    handleToggleModal();
    e.stopPropagation();
  };

  drag(drop(columnRef));

  return (
    <div
      style={{ opacity }}
      className={styles['column-item']}
      data-handler-id={handlerId}
      ref={columnRef}
    >
      {isEdit ? (
        <div className={styles['column-header']}>
          <div className={styles['title-wrapper']}>
            <div className={styles['title-before-edit']}>
              <img
                className={styles['cancel']}
                src={cancelImg}
                alt="cancel"
                onClick={handleCancelEdit}
              />
              <img
                className={styles['accept']}
                src={acceptImg}
                alt="accept"
                onClick={handleAcceptEdit}
              />
            </div>
            <input
              className={styles['input-edit']}
              type="text"
              placeholder={title}
            />
          </div>
        </div>
      ) : (
        <div className={styles['column-header']} onClick={handleEdit}>
          <div className={styles['title-wrapper']}>
            <div className={styles['title-before']} />
            <h3 className={styles.title}>{title}</h3>
            <div className={styles['title-after']}>{item.tasks.length}</div>
          </div>
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
      )}
      <div className={styles['task-list-wrapper']}>
        <ul className={styles['task-list']}>
          {tasks.map((task, index) => {
            const { id } = task;
            const taskPosition: TaskPosition = {
              columnX: columnIndex,
              taskY: index,
            };
            const handleDeleteTask = (): void => {
              dispatch(
                taskActions.removeTask({ boardId, columnId, taskId: id }),
              );
            };
            return (
              <TaskLink
                key={id}
                data={task}
                onClick={handleDeleteTask}
                moveTask={moveTask}
                dropTask={dropTask}
                taskPosition={taskPosition}
                columnId={columnId}
                boardId={boardId}
              />
            );
          })}
        </ul>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleToggleModal}>
        <TaskCreatingForm
          boardId={boardId}
          columnId={columnId}
          onClose={handleToggleModal}
        />
      </Modal>
      <ConfirmationModal
        isOpen={confirmationModalOpen}
        onClose={handleCloseConfirmation}
        onConfirm={handleDeleteColumn}
      />
    </div>
  );
};
