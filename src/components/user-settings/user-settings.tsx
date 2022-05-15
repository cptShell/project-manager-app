import { FC } from 'react';
import { useAppSelector } from '~/hooks/hooks';
import { EditForm } from './components/user-edit-form';

export const User: FC = () => {
  const { name, login, id } = useAppSelector(({ auth }) => ({
    name: auth.user?.name,
    login: auth.user?.login,
    id: auth.user?.id,
  }));

  return (
    <>
      <h2>User Settings</h2>
      <span>Current id: {id}</span>
      <br />
      <span>Current name: {name}</span>
      <br />
      <span>Current login: {login}</span>
      <br />
      <EditForm />
    </>
  );
};
