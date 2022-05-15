import { FC } from 'react';
import { useAppDispatch } from '~/hooks/hooks';
import { auth as authActions } from '~/store/actions';
import { LanguageSwitcher } from '../language-switcher/language-switcher';

export const Header: FC = () => {
  const dispatch = useAppDispatch();

  const handleSignOut = (): void => {
    dispatch(authActions.signOut());
  };

  const handleEditUser = (): void => {
    //TODO: complete logic after adding user editor route
  };

  const handleCreateBoard = (): void => {
    //TODO: complete logic after adding board route
  };

  return (
    <div>
      <LanguageSwitcher />
      <button onClick={handleCreateBoard}>Create board</button>
      <button onClick={handleEditUser}>Edit user</button>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};
