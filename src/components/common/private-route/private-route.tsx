import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '~/common/enums/enums';
import { useAppSelector } from '~/hooks/hooks';

type Props = {
  redirectTo: AppRoute;
  children: ReactNode;
};

export const PrivateRoute: FC<Props> = ({ redirectTo, children }) => {
  const { user } = useAppSelector((state) => ({
    user: state.auth.user,
  }));

  if (!user) {
    return <Navigate to={redirectTo} />;
  }

  return <>{children}</>;
};
