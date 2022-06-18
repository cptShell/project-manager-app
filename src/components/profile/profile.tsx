import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { user as userActions } from '~/store/actions';
import { FormattedMessage, MainButton } from '../common/common';
import { ConfirmationModal } from '../common/confirmation-modal/confirmation-modal';
import { EditForm } from './components/edit-form';
import styles from './styles.module.scss';

export const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector(({ auth }) => ({
    id: auth.user?.id,
  }));
  const [isOpen, setOpen] = useState(false);

  const handleShowModal = (): void => {
    setOpen(true);
  };

  const handleCloseModal = (): void => {
    setOpen(false);
  };

  const handleDeleteUser = (): void => {
    if (id) {
      dispatch(userActions.deleteUser(id));
    }
  };

  return (
    <div className={styles['wrapper']}>
      <MainButton />
      <EditForm />
      <FormattedMessage
        onClick={handleShowModal}
        as="button"
        message="profile.buttons.deleteUser"
        className={styles['delete-button']}
      />
      <ConfirmationModal
        message={'modals.confirmation.deleteUser'}
        isOpen={isOpen}
        onConfirm={handleDeleteUser}
        onClose={handleCloseModal}
      />
    </div>
  );
};
