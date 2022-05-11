import { FC } from 'react';
import { Home } from '~/components/home/home';
import { Main } from '~/components/main/main';
import { Board } from '~/components/board/board';
import { Auth } from '~/components/auth/auth';
import { NotFound } from '~/components/not-found-page/not-found-page';
import { AppRoute } from '~/common/enums/enums';
import { Route, Routes } from '../common/common';

export const App: FC = () => {
  return (
    <Routes>
      <Route path={AppRoute.ROOT} element={<Home />} />
      <Route path={AppRoute.MAIN} element={<Main />} />
      <Route path={AppRoute.BOARD} element={<Board />} />
      <Route path={AppRoute.SIGN_IN} element={<Auth />} />
      <Route path={AppRoute.SIGN_UP} element={<Auth />} />
      <Route path={AppRoute.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
};
