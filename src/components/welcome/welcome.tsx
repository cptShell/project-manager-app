import { FC } from 'react';
import { AppRoute } from '~/common/enums/enums';
import { PageButtonData } from '~/common/types/button/page-button';
import { PageButton } from './components/page-button';

const authButtonsData: Array<PageButtonData> = [
  {
    path: AppRoute.SIGN_IN,
    title: 'Sign in',
  },
  {
    path: AppRoute.SIGN_UP,
    title: 'Sign up',
  },
];

export const Welcome: FC = () => {
  const authButtons = authButtonsData.map(({ path, title }) => {
    return (
      <li>
        <PageButton path={path} title={title} />
      </li>
    );
  });

  return (
    <div>
      <h2>Welcome</h2>
      <ul>{authButtons}</ul>
    </div>
  );
};
