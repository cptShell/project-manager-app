import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AppRoute, StorageKey } from '~/common/enums/enums';
import { useAppSelector } from '~/hooks/hooks';
import { storage } from '~/services/services';
import { SignInForm } from './components/sign-in-form';
import { SignUpForm } from './components/sign-up-form';

export const Auth: FC = () => {
  const { pathname } = useLocation();
  const token = storage.getItem(StorageKey.TOKEN);
  const { user } = useAppSelector(({ auth }) => ({
    user: auth.user,
  }));
  const isAuthenticated = Boolean(token) && Boolean(user);

  if (isAuthenticated) {
    return <Navigate to={AppRoute.ROOT} />;
  }

  const getForm = (path: string): JSX.Element => {
    if (path === AppRoute.SIGN_UP) {
      return <SignUpForm />;
    }
    return <SignInForm />;
  };

  return getForm(pathname);
};
