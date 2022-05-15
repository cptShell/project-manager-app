import { FC } from 'react';
import { useAppSelector } from '~/hooks/hooks';
import { EditForm } from './components/user-edit-form';

export const User: FC = () => {
  const { name, login, id } = useAppSelector(({ auth }) => ({
    name: auth.user?.name,
    login: auth.user?.login,
    id: auth.user?.id,
  }));

  //POSSIBLE TODO: add more info about current user in wrapper of EditUserForm
  return (
    <>
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
