import { FC } from 'react';
import { AppRoute } from '~/common/enums/enums';
import { Route, Routes } from '../common/common';
import { Home } from '~/components/home/home';

export const App: FC = () => {
  return (
    <Routes>    
      <Route path={AppRoute.ROOT} element={<Home />} />
    </Routes>
  );
};
