import { AppRoute } from '~/common/enums/enums';
import { NavigationLink } from '~/common/types/types';

export const AUTH_BUTTONS_DATA: Array<NavigationLink> = [
  {
    to: AppRoute.SIGN_IN,
    title: 'Sign in',
  },
  {
    to: AppRoute.SIGN_UP,
    title: 'Sign up',
  },
];

export const LOGGED_IN_BUTTONS_DATA: Array<NavigationLink> = [
  {
    to: AppRoute.MAIN,
    title: 'Main Page',
  },
];
