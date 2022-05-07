import { FC } from 'react';
import { Home } from '~/components/home/home';
import { AppRoute } from '~/common/enums/enums';
import { Route, Routes } from '../common/common';

export const App: FC = () => {
  return (
    <Routes>
      <Route path={AppRoute.ROOT} element={<Home />} />
    </Routes>
  );
};
