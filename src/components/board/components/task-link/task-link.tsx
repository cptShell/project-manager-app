import { FC, useState } from 'react';
import { TaskDto } from '~/common/types/types';
import { ConfirmationModal } from '~/components/common/confirmation-modal/confirmation-modal';
import { Modal } from '~/components/common/modal/modal';
import { Button } from '../button';
import { Task } from '../task';

type Props = {
  data: TaskDto;
  onClick: () => void;
  columnId: string;
  boardId: string;
};

export const TaskLink: FC<Props> = ({ data, onClick, columnId, boardId }) => {
  const { id, title, description } = data;
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenConfirmation = (): void => {
    setConfirmationModalOpen(true);
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

  return (
    <div>
      <ConfirmationModal
        isOpen={confirmationModalOpen}
        onClose={handleCloseConfirmation}
        onConfirm={onClick}
      />
      <Modal isOpen={isOpen} onClose={handleModalClose}>
        <Task item={data} boardId={boardId} columnId={columnId} />
      </Modal>
      <li key={id} onClick={handleModalOpen}>
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
