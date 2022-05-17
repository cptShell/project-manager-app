import { FC } from 'react';
import { useAppSelector } from '~/hooks/hooks';
import { EditForm } from './components/edit-form';

export const Profile: FC = () => {
  const { name, login, id } = useAppSelector(({ auth }) => ({
    name: auth.user?.name,
    login: auth.user?.login,
    id: auth.user?.id,
  }));

  return (
    <>
      <h2>User Settings</h2>
      <ul>
        <li>Current id: {id}</li>
        <li>Current name: {name}</li>
        <li>Current login: {login}</li>
      </ul>
      <EditForm />
    </>
  );
};
