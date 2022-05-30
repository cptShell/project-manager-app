import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '~/common/enums/enums';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { user as userActions } from '~/store/actions';
import { FormattedMessage } from '../common/common';
import { ConfirmationModal } from '../common/confirmation-modal/confirmation-modal';
import { EditForm } from './components/edit-form';
import arrowImg from '~/assets/images/back-arrow.svg';
import styles from './styles.module.scss';

export const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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

  const handleDeleteUser = async (): Promise<void> => {
    if (id) {
      await dispatch(userActions.deleteUser(id));
    }
  };

  const handleReturn = (): void => {
    navigate(AppRoute.MAIN);
  };

  return (
    <div className={styles['wrapper']}>
      <div className={styles['back-to-main-container']} onClick={handleReturn}>
        <img
          className={styles['back-to-main-icon']}
          src={arrowImg}
          alt="back arrow"
        />
        <FormattedMessage
          className={styles['back-to-main']}
          as="h3"
          message="board.buttons.backToMainPage"
        />
      </div>
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
