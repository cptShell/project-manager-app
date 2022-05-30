import { FC, useRef, useState } from 'react';
import {
  ColumnDto,
  DragColumnItem,
  DragTaskItem,
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
import { useForm } from 'react-hook-form';

type FormData = {
  title: string;
};

type Props = {
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
  moveTask: (dragPosition: TaskPosition, hoverPosition: TaskPosition) => void;
  item: FullColumnDto;
  boardId: string;
  columnIndex: number;
  dropColumn: (dropIndex: number) => void;
  dropTask: (dropTask: TaskPosition) => void;
  handleDeleteColumn: () => void;
  updateColumns: () => void;
};

export const Column: FC<Props> = ({
  item,
  boardId,
  moveColumn,
  moveTask,
  columnIndex,
  dropColumn,
  dropTask,
  handleDeleteColumn,
  updateColumns,
}) => {
  const { id: columnId, tasks } = item;
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(item.title);
  const columnRef = useRef<HTMLDivElement>(null);
  const { register, handleSubmit, reset } = useForm<FormData>({
    mode: 'onChange',
  });

  const [{ handlerId: taskColumnHandlerId }, dropOnColumn] = useDrop<
    DragTaskItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemType.TASK,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragTaskItem) {
      if (tasks.length) {
        return;
      }

      const newTaskPostion: TaskPosition = {
        columnX: columnIndex,
        taskY: 0,
      };
      const currentPosition = item.position;

      moveTask(currentPosition, newTaskPostion);

      item.position = newTaskPostion;
    },
    drop() {
      if (tasks.length) {
        return;
      }

      const dropPosition: TaskPosition = {
        columnX: columnIndex,
        taskY: 0,
      };

      dropTask(dropPosition);
    },
  });

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
    const createColumnResponseDto: ColumnDto = {
      id: item.id,
      title,
      order: item.order,
    };
    const columnResponse = {
      boardId,
      createColumnResponseDto,
    };

    dispatch(columnActions.update(columnResponse));

    setIsEdit(false);
    setTitle(data.title);
    reset();
  };
  const submit = (): void => {
    handleSubmit(handleAcceptEdit)();
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
      <div
        className={styles['task-list-wrapper']}
        data-handler-id={taskColumnHandlerId}
      >
        <ul
          style={{ minHeight: '150px' }}
          className={styles['task-list']}
          ref={dropOnColumn}
        >
          {tasks.map((task, index) => {
            const { id } = task;
            const taskPosition: TaskPosition = {
              columnX: columnIndex,
              taskY: index,
            };

            const handleDeleteTask = async (): Promise<void> => {
              await dispatch(
                taskActions.removeTask({ boardId, columnId, taskId: id }),
              );

              updateColumns();
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
                updateColumns={updateColumns}
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
