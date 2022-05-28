import { FC } from 'react';
import { Main } from '~/components/main/main';
import { Board } from '~/components/board/board';
import { NotFound } from '~/components/not-found-page/not-found-page';
import { AppRoute, DataStatus, StorageKey } from '~/common/enums/enums';
import {
  Layout,
  Navigate,
  PrivateRoute,
  Route,
  Routes,
} from '../common/common';
import { Auth } from '~/components/auth/auth';
import { storage } from '~/services/services';
import { Welcome } from '../welcome/welcome';
import { useAppDispatch, useAppSelector, useEffect } from '~/hooks/hooks';
import { auth as authActions } from '~/store/actions';
import { Profile } from '../profile/profile';
import { Loader } from '../common/loader/loader';
import { Footer } from '../footer/footer';

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
    return <Loader />;
  }

  return (
    <>
      <Routes>
        <Route
          path={AppRoute.ROOT}
          element={<Navigate to={AppRoute.WELCOME} />}
        />
        <Route
          element={
            <PrivateRoute redirectTo={AppRoute.SIGN_IN}>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path={AppRoute.MAIN} element={<Main />} />
          <Route path={AppRoute.PROFILE} element={<Profile />} />
        </Route>
        <Route path={AppRoute.$BOARD_ID} element={<Board />} />
        <Route path={AppRoute.SIGN_IN} element={<Auth />} />
        <Route path={AppRoute.SIGN_UP} element={<Auth />} />
        <Route path={AppRoute.WELCOME} element={<Welcome />} />
        <Route path={AppRoute.NOT_FOUND} element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};
