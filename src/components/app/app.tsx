import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from 'components/home/home';
import { AppRoute } from 'common/enums/enums';

export const App: FC = () => {
  return (
    <Routes>
      <Route path={AppRoute.ROOT} element={<Home />} />
    </Routes>
  );
};
