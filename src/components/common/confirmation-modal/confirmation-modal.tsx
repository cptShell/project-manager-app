import { FC } from 'react';
import { AppLocalizationKey } from '~/common/types/types';
import { Button } from '~/components/common/button/button';
import { FormattedMessage } from '../common';
import { Modal } from '../modal/modal';
import styles from './styles.module.scss';

type Props = {
  onConfirm: () => void;
  isOpen: boolean;
  onClose: () => void;
  message: AppLocalizationKey;
};

export const ConfirmationModal: FC<Props> = ({
  onConfirm,
  onClose,
  isOpen,
  message,
}) => {
  const handleConfirm = (): void => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <FormattedMessage as="h3" message={message} />
        <div className={styles['buttons-container']}>
          <Button
            title={'modals.confirmation.buttons.reject'}
            onClick={onClose}
          />
          <Button
            title={'modals.confirmation.buttons.confirm'}
            onClick={handleConfirm}
          />
        </div>
      </div>
    </Modal>
  );
};
