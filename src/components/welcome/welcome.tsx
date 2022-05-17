import { FC } from 'react';
import { AUTH_BUTTONS_DATA } from './common/constants/constants';
import { PageButton } from './components/page-button';

export const Welcome: FC = () => {
  const authButtons = AUTH_BUTTONS_DATA.map(({ to, title }) => {
    return (
      <li key={title}>
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
