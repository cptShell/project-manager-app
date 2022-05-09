import { FC } from 'react';
import { Home } from '~/components/home/home';
import { AppRoute } from '~/common/enums/enums';
import { Route, Routes } from '../common/common';
import { Auth } from '~/components/auth/auth';

export const App: FC = () => {
  return (
    <Routes>
      <Route path={AppRoute.ROOT} element={<Home />} />
      <Route path={AppRoute.AUTH} element={<Auth />} />
    </Routes>
  );
};
