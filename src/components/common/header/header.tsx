import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '~/common/enums/enums';
import { useAppDispatch } from '~/hooks/hooks';
import { auth as authActions } from '~/store/actions';
import { FormattedMessage } from '../common';
import { LanguageSwitcher } from '../language-switcher/language-switcher';

export const Header: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignOut = (): void => {
    dispatch(authActions.signOut());
  };

  const handleEditUser = (): void => {
    navigate(AppRoute.PROFILE);
  };

  const handleCreateBoard = (): void => {
    //TODO: complete logic after adding board route
  };

  return (
    <div>
      <LanguageSwitcher />
      <button onClick={handleCreateBoard}>
        <FormattedMessage as="span" message="header.nav.createBoard" />
      </button>
      <button onClick={handleEditUser}>
        <FormattedMessage as="span" message="header.nav.editUser" />
      </button>
      <button onClick={handleSignOut}>
        <FormattedMessage as="span" message="header.nav.signOut" />
      </button>
    </div>
  );
};
