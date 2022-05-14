import { FC } from 'react';
import { Modal } from '../modal/modal';
import styles from './styles.module.scss';

type Props = {
  onConfirm: () => void,
  isOpen: boolean,
  onClose: () => void
};

export const ConfirmationModal: FC<Props> = ({ onConfirm, onClose, isOpen }) => {
  const handleConfirm = (): void => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <h3>Are You Sure?</h3>
        <div className={styles.btns}>
          <button onClick={handleConfirm}>Yes</button>
          <button onClick={onClose}>No</button>
        </div>
      </div>
    </Modal>
  );
};
