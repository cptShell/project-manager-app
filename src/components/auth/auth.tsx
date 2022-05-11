import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AppRoute, StorageKey } from '~/common/enums/enums';
import { storage } from '~/services/services';
import { SignIn } from './components/sign-in';
import { SignUp } from './components/sign-up';

export const Auth: FC = () => {
  const { pathname } = useLocation();
  const token = storage.getItem(StorageKey.TOKEN);

  if (token) {
    return <Navigate to={AppRoute.ROOT} />;
  }

  const getForm = (path: string): JSX.Element => {
    if (path === AppRoute.SIGN_UP) {
      return <SignUp />;
    }
    return <SignIn />;
  };

  return getForm(pathname);
};
