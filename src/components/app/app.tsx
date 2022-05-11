import { FC } from 'react';
import { Home } from '~/components/home/home';
import { AppRoute } from '~/common/enums/enums';
import { Route, Routes } from '../common/common';
import { Auth } from '~/components/auth/auth';

export const App: FC = () => {
  //const token = storage.getItem(StorageKey.TOKEN);
  //TODO: add logic for no-rendering sign-in/sign-up routes while user is unauthorized

  return (
    <Routes>
      <Route path={AppRoute.ROOT} element={<Home />} />
      <Route path={AppRoute.SIGN_IN} element={<Auth />} />
      <Route path={AppRoute.SIGN_UP} element={<Auth />} />
    </Routes>
  );
};
