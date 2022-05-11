import { FC } from 'react';
import { Modal } from '../modal/modal';
import styles from './styles.module.scss';

type Props = {
  onConfirm: () => void,
  isOpen: boolean,
  onClose: (e: React.MouseEvent) => void
};

export const ConfirmationModal: FC<Props> = ({ onConfirm, onClose, isOpen }) => {
  const handleConfirm = (e: React.MouseEvent): void => {
    onConfirm();
    onClose(e);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <p>Are You Sure?</p>
        <div className={styles.btns}>
          <button onClick={handleConfirm}>Yes</button>
          <button onClick={onClose}>No</button>
        </div>
      </div>
    </Modal>
  );
};
