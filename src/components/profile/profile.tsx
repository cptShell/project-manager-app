import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { user as userActions } from '~/store/actions';
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
      <h2>User Settings</h2>
      <ul>
        <li>Current id: {id}</li>
        <li>Current name: {name}</li>
        <li>Current login: {login}</li>
      </ul>
      <EditForm />
      <button onClick={handleShowModal}>Delete User</button>
      <ConfirmationModal
        isOpen={isOpen}
        onConfirm={handleDeleteUser}
        onClose={hanldeCloseModal}
      />
    </>
  );
};
