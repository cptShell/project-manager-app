import { FC } from 'react';
import { Main } from '~/components/main/main';
import { Board } from '~/components/board/board';
import { NotFound } from '~/components/not-found-page/not-found-page';
import { AppRoute, DataStatus, StorageKey } from '~/common/enums/enums';
import { Layout, Navigate, Route, Routes } from '../common/common';
import { Auth } from '~/components/auth/auth';
import { storage } from '~/services/services';
import { Welcome } from '../welcome/welcome';
import { useAppDispatch, useAppSelector, useEffect } from '~/hooks/hooks';
import { auth as authActions } from '~/store/actions';
import { UserEditor } from '../edit-user/edit-user';

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const { user, userStatus } = useAppSelector(({ auth }) => ({
    user: auth.user,
    userStatus: auth.userStatus,
  }));
  const token = storage.getItem(StorageKey.TOKEN);
  const hasToken = Boolean(token);

  useEffect(() => {
    if (hasToken) {
      dispatch(authActions.loadAuthenticatedUser());
    }
  }, [hasToken]);

  if (hasToken && !user && userStatus !== DataStatus.REJECTED) {
    return <div>Loading</div>;
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={AppRoute.MAIN} element={<Main />} />
        <Route path={AppRoute.BOARD} element={<Board />} />
        <Route path={AppRoute.EDIT_USER} element={<UserEditor />} />
      </Route>
      <Route path={AppRoute.SIGN_IN} element={<Auth />} />
      <Route path={AppRoute.SIGN_UP} element={<Auth />} />
      <Route path={AppRoute.WELCOME} element={<Welcome />} />
      <Route
        path={AppRoute.ROOT}
        element={<Navigate to={AppRoute.WELCOME} />}
      />
      <Route path={AppRoute.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
};
