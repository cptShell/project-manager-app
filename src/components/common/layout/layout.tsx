import { FC } from 'react';
import { Header, Outlet } from '../common';

export const Layout: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
