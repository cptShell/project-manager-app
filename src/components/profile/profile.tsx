import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { user as userActions } from '~/store/actions';
import { FormattedMessage } from '../common/common';
import { ConfirmationModal } from '../common/confirmation-modal/confirmation-modal';
import { EditForm } from './components/edit-form';

export const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const { name, login, id } = useAppSelector(({ auth }) => ({
    name: auth.user?.name,
    login: auth.user?.login,
    id: auth.user?.id,
  }));
  const [isOpen, setOpen] = useState(false);

  const handleShowModal = (): void => {
    setOpen(true);
  };

  const hanldeCloseModal = (): void => {
    setOpen(false);
  };

  const handleDeleteUser = async (): Promise<void> => {
    if (id) {
      await dispatch(userActions.deleteUser(id));
    }
  };

  return (
    <>
      <FormattedMessage as="h2" message="profile.title"/>
      <ul>
        <li><FormattedMessage as="span" message="profile.userData.currentId"/> {id}</li>
        <li><FormattedMessage as="span" message="profile.userData.currentName"/> {name}</li>
        <li><FormattedMessage as="span" message="profile.userData.currentLogin"/> {login}</li>
      </ul>
      <EditForm />
      <button onClick={handleShowModal}>
        <FormattedMessage as="span" message="profile.buttons.deleteUser"/>
      </button>
      <ConfirmationModal
        isOpen={isOpen}
        onConfirm={handleDeleteUser}
        onClose={hanldeCloseModal}
      />
    </>
  );
};
