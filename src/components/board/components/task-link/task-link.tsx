import { FC, useState } from 'react';
import styles from './styles.module.scss';
import { TaskDto } from '~/common/types/types';
import { ConfirmationModal } from '~/components/common/confirmation-modal/confirmation-modal';
import bucketImg from '~/assets/images/delete-bucket.svg';

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
      <li className={styles['column-item']}
        key={id}>
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
