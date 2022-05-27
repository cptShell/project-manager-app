import { Identifier, XYCoord } from 'dnd-core';
import { FC, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemType } from '~/common/enums/enums';
import { TaskDto } from '~/common/types/types';
import { ConfirmationModal } from '~/components/common/confirmation-modal/confirmation-modal';
import { Button } from '../button';

type Props = {
  data: TaskDto;
  onClick: () => void;
  moveTask: (dragPosition: TaskPosition, hoverPosition: TaskPosition) => void;
  taskPosition: TaskPosition;
};

type TaskPosition = {
  columnX: number;
  taskY: number;
};

type DragItem = {
  position: TaskPosition;
  id: string;
  type: string;
};

export const TaskLink: FC<Props> = ({
  data,
  onClick,
  moveTask,
  taskPosition,
}) => {
  const { id, title, description } = data;
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const taskRef = useRef<HTMLDivElement>(null);

  const handleOpenConfirmation = (): void => {
    setConfirmationModalOpen(true);
  };
  const handleCloseConfirmation = (): void => {
    setConfirmationModalOpen(false);
  };

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemType.TASK,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      console.log(monitor);
      if (!taskRef.current) {
        return;
      }
      const { position: dragPosition } = item;
      const { columnX: dragColumnX, taskY: dragTaskY } = dragPosition;
      const { columnX: hoverColumnX, taskY: hoverTaskY } = taskPosition;

      if (dragColumnX === hoverColumnX && dragTaskY === hoverTaskY) {
        return;
      }

      const hoverBoundingRect = taskRef.current?.getBoundingClientRect();
      const deadZoneY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const deadZoneX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

      if (dragTaskY < hoverTaskY && hoverClientY < deadZoneY) {
        return;
      }

      if (dragTaskY > hoverTaskY && hoverClientY > deadZoneY) {
        return;
      }

      if (dragColumnX < hoverColumnX && hoverClientX < deadZoneX) {
        return;
      }

      if (dragColumnX > hoverColumnX && hoverClientX > deadZoneX) {
        return;
      }

      moveTask(dragPosition, taskPosition);

      item.position = taskPosition;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType.TASK,
    item: (): DragItem => {
      return { id, position: taskPosition, type: ItemType.TASK };
    },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(taskRef));

  return (
    <div style={{ opacity }} ref={taskRef} data-handler-id={handlerId}>
      <ConfirmationModal
        isOpen={confirmationModalOpen}
        onClose={handleCloseConfirmation}
        onConfirm={onClick}
      />
      <li key={id}>
        <h3>{title}</h3>
        <p>{description}</p>
        <Button
          title={'board.buttons.deleteColumn'}
          onClick={handleOpenConfirmation}
        />
      </li>
    </div>
  );
};
