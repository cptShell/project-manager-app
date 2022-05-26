import { FC } from 'react';
import { FormattedMessage } from '../common';
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
        <FormattedMessage as="h3" message="modals.confirmation.title" />
        <div className={styles['buttons-container']}>
          <button onClick={handleConfirm}>
            <FormattedMessage as="span" message="modals.confirmation.buttons.confirm" />
          </button>
          <button onClick={onClose}>
            <FormattedMessage as="span" message="modals.confirmation.buttons.reject" />
          </button>
        </div>
      </div>
    </Modal>
  );
};
