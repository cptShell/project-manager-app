import { FC, useRef, useState } from 'react';
import {
  DragColumnItem,
  FullColumnDto,
  TaskPosition,
} from '~/common/types/types';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';
import { column as columnActions, task as taskActions } from '~/store/actions';
import { Button } from './button';
import { useAppDispatch } from '~/hooks/hooks';
import { Modal } from '~/components/common/modal/modal';
import { TaskCreatingForm } from './task-creating-form';
import { ConfirmationModal } from '~/components/common/confirmation-modal/confirmation-modal';
import { TaskLink } from './task-link/task-link';
import { ItemType } from '~/common/enums/enums';
import styles from '../styles.module.scss';

type Props = {
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
  moveTask: (dragPosition: TaskPosition, hoverPosition: TaskPosition) => void;
  item: FullColumnDto;
  boardId: string;
  columnIndex: number;
};

export const Column: FC<Props> = ({
  item,
  boardId,
  moveColumn,
  moveTask,
  columnIndex,
}) => {
  const { id: columnId, title, tasks } = item;
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
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

  const opacity = isDragging ? 0 : 1;

  const handleDeleteColumn = (): void => {
    dispatch(columnActions.removeColumn({ boardId, columnId }));
  };

  const handleToggleModal = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOpenConfirmation = (): void => {
    setConfirmationModalOpen(true);
  };
  const handleCloseConfirmation = (): void => {
    setConfirmationModalOpen(false);
  };

  drag(drop(columnRef));

  return (
    <div
      style={{ opacity }}
      className={styles['column-item']}
      data-handler-id={handlerId}
      ref={columnRef}
    >
      <h3>{title}</h3>
      <div>
        <ul>
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
      <Button
        title={'board.column.buttons.addTask'}
        onClick={handleToggleModal}
      />
      <Button
        title={'board.column.buttons.deleteTask'}
        onClick={handleOpenConfirmation}
      />
    </div>
  );
};
