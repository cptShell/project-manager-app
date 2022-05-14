import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AppRoute } from '~/common/enums/enums';
import { useAppSelector } from '~/hooks/hooks';
import { SignInForm } from './components/sign-in-form';
import { SignUpForm } from './components/sign-up-form';

export const Auth: FC = () => {
  const { pathname } = useLocation();
  const { user } = useAppSelector(({ auth }) => ({
    user: auth.user,
  }));
  const hasUser = Boolean(user);

  if (hasUser) {
    return <Navigate to={AppRoute.MAIN} />;
  }

  const getForm = (path: string): JSX.Element => {
    if (path === AppRoute.SIGN_UP) {
      return <SignUpForm />;
    }
    return <SignInForm />;
  };

  return getForm(pathname);
};
