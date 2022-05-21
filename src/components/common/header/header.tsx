import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '~/common/enums/enums';
import { BoardCreatingForm } from '~/components/main/components/board-creating-form';
import { useAppDispatch } from '~/hooks/hooks';
import { auth as authActions } from '~/store/actions';
import { LanguageSwitcher } from '../language-switcher/language-switcher';

export const Header: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = (): void => {
    dispatch(authActions.signOut());
  };

  const handleEditUser = (): void => {
    navigate(AppRoute.PROFILE);
  };

  const handleCreateBoard = (): void => {
    setIsOpen(true);
  };

  return (
    <div>
      <LanguageSwitcher />
      <BoardCreatingForm isOpen={isOpen} setIsOpen={setIsOpen} />
      <button onClick={handleCreateBoard}>Create board</button>
      <button onClick={handleEditUser}>Edit user</button>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};
