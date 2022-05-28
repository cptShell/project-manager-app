import React, { FC, useState } from 'react';
import styles from './styles.module.scss';
import { TaskDto } from '~/common/types/types';
import { ConfirmationModal } from '~/components/common/confirmation-modal/confirmation-modal';
import { Modal } from '~/components/common/modal/modal';
import { Task } from '../task';
import bucketImg from '~/assets/images/delete-bucket.svg';

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

  const handleOpenConfirmation = (e: React.MouseEvent): void => {
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
    <>
      <ConfirmationModal
        isOpen={confirmationModalOpen}
        onClose={handleCloseConfirmation}
        onConfirm={onClick}
      />
      <Modal isOpen={isOpen} onClose={handleModalClose}>
        <Task item={data} boardId={boardId} columnId={columnId} />
      </Modal>
      <li className={styles['column-item']}
        key={id}
        onClick={handleModalOpen}
      >
        <div className={styles['column-top']}>
          <h3 className={styles['column-title']}>
            {title}
          </h3>
          <img className={styles['column-img']}
            src={bucketImg}
            onClick={handleOpenConfirmation}
            alt="delete">
          </img>
        </div>
        <div className={styles['column-bottom']}>
          <p className={styles['column-text']}>
            {description}
          </p>
        </div>
      </li>
    </>
  );
};
