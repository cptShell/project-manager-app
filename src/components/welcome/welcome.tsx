import { FC } from 'react';
import { AppRoute } from '~/common/enums/enums';
import { NavigationLink } from '~/common/types/navigation/navigation-link';
import { PageButton } from './components/page-button';

const authButtonsData: Array<NavigationLink> = [
  {
    to: AppRoute.SIGN_IN,
    title: 'Sign in',
  },
  {
    to: AppRoute.SIGN_UP,
    title: 'Sign up',
  },
];

export const Welcome: FC = () => {
  const authButtons = authButtonsData.map(({ to, title }) => {
    return (
      <li>
        <PageButton path={to} title={title} />
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
