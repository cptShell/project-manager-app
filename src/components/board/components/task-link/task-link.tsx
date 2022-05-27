import { FC, useState } from 'react';
import { TaskDto } from '~/common/types/types';
import { ConfirmationModal } from '~/components/common/confirmation-modal/confirmation-modal';
import { Button } from '../button';

type Props = {
  data: TaskDto;
  onClick: () => void;
};

export const TaskLink: FC<Props> = ({ data, onClick }) => {
  const { id, title, description } = data;
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const handleOpenConfirmation = (): void => {
    setConfirmationModalOpen(true);
  };
  const handleCloseConfirmation = (): void => {
    setConfirmationModalOpen(false);
  };

  return (
    <>
      <ConfirmationModal
        isOpen={confirmationModalOpen}
        onClose={handleCloseConfirmation}
        onConfirm={onClick}
      />
      <li key={id}>
        <h3>{title}</h3>
        <p>{description}</p>
        <Button title={'board.buttons.deleteColumn'} onClick={handleOpenConfirmation} />
      </li>
    </>
  );
};
