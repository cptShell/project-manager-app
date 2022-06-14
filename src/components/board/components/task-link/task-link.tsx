import { FC, useState, MouseEvent } from 'react';
import { TaskDto, UserDto } from '~/common/types/types';
import { ConfirmationModal } from '~/components/common/confirmation-modal/confirmation-modal';
import { Modal } from '~/components/common/modal/modal';
import { Task } from '../task';
import styles from './styles.module.scss';
import bucketImg from '~/assets/images/delete-bucket.svg';

type Props = {
  data: TaskDto;
  onClick: () => void;
  boardId: string;
  columnId: string;
  updateColumns: () => void;
  taskOwner: UserDto | undefined;
};

export const TaskLink: FC<Props> = ({
  data,
  onClick,
  boardId,
  columnId,
  taskOwner,
  updateColumns,
}) => {
  const { id, title, description } = data;
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <div>
      <ConfirmationModal
        message={'modals.confirmation.deleteTask'}
        isOpen={confirmationModalOpen}
        onClose={handleCloseConfirmation}
        onConfirm={onClick}
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
      <li className={styles['column-item']} key={id} onClick={handleModalOpen}>
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
        {taskOwner && <span className={styles.owner}>{taskOwner.name}</span>}
      </li>
    </div>
  );
};
