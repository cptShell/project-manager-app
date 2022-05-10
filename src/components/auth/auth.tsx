import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { AppRoute } from '~/common/enums/enums';
import { SignIn } from './components/sign-in';
import { SignUp } from './components/sign-up';

export const Auth: FC = () => {
  const { pathname } = useLocation();

  const getForm = (path: string): JSX.Element => {
    if (path === AppRoute.SIGN_UP) {
      return <SignUp />;
    }
    return <SignIn />;
  };

  return getForm(pathname);
};
