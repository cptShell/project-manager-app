import { FC } from 'react';
import { Home } from '~/components/home/home';
import { Main } from '~/components/main/main';
import { Board } from '~/components/board/board';
import { NotFound } from '~/components/not-found-page/not-found-page';
import { AppRoute, StorageKey } from '~/common/enums/enums';
import { Route, Routes } from '../common/common';
import { Auth } from '~/components/auth/auth';
import { storage } from '~/services/services';

export const App: FC = () => {
  const user = storage.getItem(StorageKey.USER);
  if (!user) {
    storage.remove(StorageKey.TOKEN);
  }
  const token = storage.getItem(StorageKey.TOKEN);

  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isAuth = Boolean(token && user);
  //TODO: add logic for sign-in/sign-up/logout button into header

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
