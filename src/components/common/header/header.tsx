import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '~/common/enums/enums';
import { useAppDispatch } from '~/hooks/hooks';
import { auth as authActions } from '~/store/actions';
import { LanguageSwitcher } from '../language-switcher/language-switcher';

export const Header: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignOut = (): void => {
    dispatch(authActions.signOut());
  };

  const handleEditUser = (): void => {
    navigate(AppRoute.EDIT_USER);
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
