import { FC } from 'react';
import { Home } from '~/components/home/home';
import { Main } from '~/components/main/main';
import { Board } from '~/components/board/board';
import { NotFound } from '~/components/not-found-page/not-found-page';
import { AppRoute } from '~/common/enums/enums';
import { Route, Routes } from '../common/common';
import { Auth } from '~/components/auth/auth';

export const App: FC = () => {
  //const token = storage.getItem(StorageKey.TOKEN);
  //TODO: add logic for no-rendering sign-in/sign-up routes while user is unauthorized

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
